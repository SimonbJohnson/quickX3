function createHeadlineFigures(count,charts,dataSets){
    charts.forEach(function(chart,i){
        var id="#headline"+i;
        if(dataSets[chart.data].length==0){
            $(id).html('No Data');
        } else {
            var bite = hxlBites.data(dataSets[chart.data]).reverse(chart.chartID);
            $('#headline').append('<div id="'+id.slice(1)+'" class="col-md-4 headlinefigure"></div>');
            createHeadLineFigure(id,bite);
        }
    });
}

function createHeadLineFigure(id,bite,title){
    var headlineHTML = '<div id="'+id.slice(1)+'text" class="headlinetext"></div><div id="'+id.slice(1)+'number" class="headlinenumber"></div>';
    $(id).html(headlineHTML);
    if(title==null){
        title = bite.bite.split(':<span')[0];
    }
    var number = String(parseInt(bite.bite.split('<span class="hbvalue">')[1].replace(/[^0-9\.]/g, ''))).replace(/(<([^>]+)>)/ig,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $(id+'text').html(title);
    $(id+'number').html(number);
}

function createDataTable(id,data,fields,start=0,tableLength=10){
    let dataTable = [];
    let fieldNums = [];
    let end = start+tableLength;
    if(end>data.length-1){
        end = data.length-1;
    }
    if(start<0){
        start = 0
    }
    fields.forEach(function(f){
        if(data[1][f.column]==f.tag){
            fieldNums.push(f.column);
        }
        //insert better matching here.
        //} else {
        //    console.log(f);
        //    let hxlData = hxl.wrap(data);
        //   hxlData.withColumns([f.tag]).getColumns().forEach(function(col){
        //        console.log(col);
        //    });
        //}
    });
    fieldNums = fieldNums.sort();
    data.forEach(function(row,i){
        let temprow = [];
        if(i==0 || i>=start+2 && i<end+2){
            fieldNums.forEach(function(f){
                temprow.push(data[i][f]);
            });
            dataTable.push(temprow);
        }
    });
    let len = data.length-1
    let before = '<span id="buttonspace"></span>';
    if(start>1){
        before = '<button id="before" class="btn btn-default"><</button>';
    }
    let after = '';
    if(end != data.length-1){
        after = '<button id="after" class="btn btn-default">></button>';
    }
    let topText = before + ' Showing '+(start+1)+' - '+(end)+' of '+len +' '+after;
    $(id).html(topText + '<table id="dataTable" class="table table-striped"><thead id="thead"></thead><tbody id="tbody"></tbody></table>');
    
    $('#after').on('click',function(){
        createDataTable(id,data,fields,start+10,tableLength);
    });

    $('#before').on('click',function(){
        createDataTable(id,data,fields,start-10,tableLength);
    });

    dataTable.forEach(function(row,i){
        if(i==0){
            $('#thead').append('<tr id="dataTableRow'+i+'"></tr>');
        } else {
            $('#tbody').append('<tr id="dataTableRow'+i+'"></tr>');
        }
        row.forEach(function(cell,j){
            cls="datatabletext";
            if(!isNaN(cell)){
                cell = numberWithCommas(cell);
                cls = "datatablenumber"
            }
            if(i==0){
                $('#dataTableRow'+i).append('<th>'+cell+'</th>');
            } else {
                $('#dataTableRow'+i).append('<td class="'+cls+'">'+cell+'</td>');
            }
        });
    })
    
}

function createChart(id,bite,sort,title){

    var labels = [];
    var series = [];
    var subtype = bite[0].subtype;
    var chart;
    maxLength = 0;
    if(sort=='descending'){
        var topline = bite[0].bite.shift();
        bite[0].bite.sort(function(a, b){
            return b[1]-a[1];
        });
        bite[0].bite.unshift(topline);
    }
    var variables = [];
    
    bite.forEach(function(b){
        variables.push(b.title.split(' by ')[0]);
    });
    if(title==null){
        if(variables.length>1){
            variables.forEach(function(v,i){
                if(i==0){
                    title = v
                } else {
                    title +=', '+v;
                }
            });
            title += ' by ' + bite[0].title.split(' by ')[1];
        } else {
            title = bite[0].title;
        }
    }
    $(id).addClass('chartcontainer');
    $(id).html('<div class="titlecontainer"><p class="bitetitletext">'+title+'</p><p class="bitetitle"></p></div><div id="chartcontainer'+id.substring(1)+'" class="chartelement"></div>');
    id = id.substring(1);
    $('#chartcontainer'+id).height($('#'+id).height()-55);
    if(subtype=="row" || subtype=="pie"){
        bite[0].bite.forEach(function(d,i){
            if(i>0){
                var label = d[0];
                if(label.length>maxLength){
                    maxLength = label.length;
                }
                if(label.length>20){
                    label = label.substring(0,18)+'...'
                }
                labels.push(label);
                series.push(d[1]);
            }  
        });
        var offset = 70;
            if(maxLength>20){
                offset = 120
            }
        chart = new Chartist.Bar('#chartcontainer'+id, {
            labels: labels,
            series: [series]
        }, {
          seriesBarDistance: 10,
          reverseData: true,
          horizontalBars: true,
          axisY: {
            offset: offset
          },
          axisX: {
              labelInterpolationFnc: function(value, index) {
                var divide = 0.5;
                if(value>1000 && $(id).width()<500){
                    divide = 1
                }
                if(value>999999){
                    value = value / 1000000 + 'm';
                }
                return index % divide === 0 ? value : null;
              }
          },
          plugins: [
            Chartist.plugins.tooltip({appendToBody:true,tooltipFnc:tooltip})
            ]
        });     
    } else {
        
        var dataSetsLines = [];
        bite.forEach(function(d,j){
            var data = d.bite.map(function(d,i){
                if(i>0){
                    return {'x':d[0].getTime(),'y':d[1]}
                }
            }).splice(1);

            data.sort(function(a, b){
                return b.x-a.x;
            });

            dataSetsLines.push({name:variables[j],data:data});            
        }); 

        chart = new Chartist.Line('#chartcontainer'+id, {
            series: dataSetsLines
        }, {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          height: ($('#chartcontainer'+id).height() - 20) + 'px',
          axisY: {
            type: Chartist.AutoScaleAxis,
            showLabel: true,
            showGrid: true,
            low: 0,
            ticks: [1, 10, 20, 30]
          },
          axisX: {
            type: Chartist.AutoScaleAxis,
            showLabel: true,
            showGrid: true,
            labelInterpolationFnc: function skipLabels(value, index) {
                return index % 2  === 0 ? new Date(value).toISOString().slice(0,10) : null;
            }
          },
          plugins: [
            Chartist.plugins.legend(),
            Chartist.plugins.tooltip({appendToBody:true,tooltipFnc:linetooltip})
            ]
        });        
    }
    return chart;   
}

function tooltip(meta,value){
    return niceNumber(value);
}

function linetooltip(meta,value){
    console.log('here');
    if(value!=null){
        let time = parseInt(value.split(',')[0]);
        time = new Date(time)
        time = time.toISOString().split('T')[0];
        value = value.split(',')[1];
        return '<p>'+meta+'</p><p>'+time + ': ' + niceNumber(value)+'</p>';
    }
}

function niceNumber(num) {
  min = 1e3;
  // Alter numbers larger than 1k
  if (num >= min) {
    var units = ["k", "M", "B", "T"];
    
    var order = Math.floor(Math.log(num) / Math.log(1000));

    var unitname = units[(order - 1)];
    var num = Math.floor(num*10 / (1000 ** order))/10;
    
    // output number remainder + unitname
    return num + unitname
  }
  
  // return formatted original number
  return num.toLocaleString()
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createMap(id,bite,data,mapOptions,title){
    var bounds = [];
    var clickOn = null;
    id = id.substring(1);
    let display = mapOptions.display;
    let scale = mapOptions.scale;
    let displayColumn = 0;
    console.log(bite);
    let idTag = bite.uniqueID.split('/')[1];
    let idColumn = '';
    if(display!=''){
        data[1].forEach(function(d,i){
            if(d == display){
                displayColumn = i;
            }
        });
    }

    data[1].forEach(function(d,i){
        if(d == idTag){
            idColumn = i;
        }
    });      
    if(title==null){
        title = bite.title;
    }

    $('#'+id).html('<div class="titlecontainer"><p class="bitetitletext">'+title+'</p><p class="bitetitle"></p></div><div id="'+id+'map" class="map"></div>');

    var map = L.map(id+'map', { fadeAnimation: false }).setView([0, 0], 2);


    L.tileLayer.grayscale('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 14, minZoom: 1
    }).addTo(map);

    if(bite.subtype=='choropleth'){
        createChoroplethMap();
    }

    if(bite.subtype == 'point'){
        createPointMap();
    }

    function createPointMap(){

        let sizeColumn = null;
        let colourColumn = null;
        let maxValue;
        let minValue;
        let range;

        let discreteColors = ['#F44336','#2196F3','#4CAF50','#FFEB3B','#795548','#9E9E9E','#9C27B0','#FFA726'];
        let categories = [];
        let addOther = false;

        let infoBox = false;
        let circleOver = false;

        if(mapOptions.size!='' && mapOptions.size!=null){
            sizeColumn = getColumn(data,mapOptions.size);

            if (sizeColumn != null) {
                maxValue = data[2][sizeColumn];
                minValue = data[2][sizeColumn];
                if(scale=='log'){
                    if(isNaN(Math.log(data[2][sizeColumn]))|| Math.log(data[2][sizeColumn])<0){
                        maxValue = 0;
                        minValue = 0;
                    } else {
                        maxValue = Math.log(data[2][sizeColumn]);
                        minValue = Math.log(data[2][sizeColumn]);
                    }
                }

                data.forEach(function(d,i){
                    if(i>1){
                        if(scale == 'log'){
                            let logValue = Math.log(d[sizeColumn]);
                            if(isNaN(logValue) || logValue<0){
                                logValue=0;
                            }   
                            if(logValue>maxValue){
                                maxValue = logValue;
                            }
                            if(logValue<minValue){
                                minValue = logValue;
                            }                    
                        } else {
                            let value = parseFloat(d[sizeColumn]);
                            if(isNaN(value)){
                                value = 0;
                            }
                            if(value>maxValue){
                                maxValue = value;
                            }
                            if(value<minValue){
                                minValue = value;
                            }                         
                        }
                  
                    }

                });

                range = maxValue-minValue
            } else {
                mapOptions.size = null;
            }
        }
        if(mapOptions.colour!='' && mapOptions.colour!=null){
            colourColumn = getColumn(data,mapOptions.colour);
            if(colourColumn!=null){
                data.forEach(function(d,i){
                    if(i>1){
                        if(categories.length<discreteColors.length-1){
                            let value = d[colourColumn];
                            if(categories.indexOf(value)==-1){
                                categories.push(value);
                            }
                        } else {
                            addOther = true;
                        }
                    }                    
                });
            }
        }

        if(addOther){
            categories.push('Other');
        }

        var circles = [];

        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info infohover');
            L.DomEvent.disableClickPropagation(this._div);
            return this._div;
        };

        info.update = function (info) { 
            this._div.innerHTML = (info ?
                info
                : 'Hover for value');
        };

        info.addTo(map);

        $('.info').on('mouseover',function(){infoBox = true;console.log('infoover');});
        $('.info').on('mouseout',function(){infoBox = false;info.update();});

        bite.bite[0].forEach(function(d,i){
            if(i>0){
                if(!isNaN(d) && !isNaN(bite.bite[1][i])){

                    let radius = 5;
                    if(mapOptions.size!='' && mapOptions.size!=null){
                        if(scale == 'log'){
                            let logValue = Math.log(data[i+1][sizeColumn]);
                            if(isNaN(logValue) || logValue<0){
                                logValue=0;
                            }
                            radius = (logValue-minValue)/range*10+2;
                        } else {
                            radius = (data[i+1][sizeColumn]-minValue)/range*10+2;
                        }
                        if(isNaN(radius)){
                            radius = 5;
                        };                       
                    }

                    let style = {
                            className: 'circlepoint',
                            fillOpacity: 0.75,
                            radius: radius,
                        }

                    if(mapOptions.colour!='' && mapOptions.colour!=null){
                        let value = data[i+1][colourColumn];
                        let cat = categories.indexOf(value);
                        let colour;
                        if(cat>-1){
                            colour = discreteColors[cat];
                        } else {
                            colour = discreteColors[discreteColors.length-1];
                        }
                        style['fillColor'] = colour;
                        style['color'] = colour;
                        style['className']  = '';

                    }

                    var circle = L.circleMarker([d, bite.bite[1][i]], style).addTo(map);

                    circle.on('mouseover',function(){
                        circleOver = true;
                        var text = '';
                        data[0].forEach(function(d,j){
                            if(j<8){
                                text += '<p>'+data[0][j]+': '+data[i+1][j]+'</p>';
                            }
                        });
                        info.update(text);
                    });
                    circle.on('mouseout',function(){
                        circleOver = false;
                        setTimeout(function(){
                            if(infoBox==false && circleOver==false){
                            info.update();
                             }
                        },100);
                    });
                    circles.push(circle);
                } else {
                    console.log('Skipping badly formed lat/lon: ' +d+','+bite.bite[1][i])
                }
            }
        });
        if(mapOptions.colour!='' && mapOptions.colour!=null){
            var legend = L.control({position: 'bottomright'});
            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend')

                categories.forEach(function(c,i){
                    div.innerHTML += '<i style="background-color:'+discreteColors[i]+';"></i> ';
                    div.innerHTML += categories[i]+'<br />';
                })
                return div;
            };

            legend.addTo(map);
        }
        var group = new L.featureGroup(circles);
        map.fitBounds(group.getBounds().pad(0.1));        
    }

    function createChoroplethMap(){

        var maxValue = bite.bite[1][1];
        var minValue = bite.bite[1][1];

        bite['lookup'] = {}

        bite.bite.forEach(function(d){
            if(d[1]>maxValue){
                maxValue = d[1];
            }
            if(d[1]<minValue){
                minValue = d[1];
            }
            bite.lookup[d[0]] = d[1];
        });

        if(maxValue-5<minValue){
            minValue = maxValue-6;
        }

        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info infohover');
            L.DomEvent.disableClickPropagation(this._div);
            this.update();
            return this._div;
        };

        info.update = function (name,id) {
            value = 'No Data';
            let displayValue = [];
            bite.bite.forEach(function(d){
                        if(d[0]==id){
                            value=d[1];
                        }
                    });
            if(display != null && display.length>0){
                data.forEach(function(d,i){
                    if(d[idColumn]==id){
                        if(displayValue.indexOf(d[displayColumn])==-1){
                            displayValue.push(d[displayColumn]);
                        }
                        
                    }
                });
            }
            displayValue = displayValue.join('</p><p>')
            if(value==0){
                displayValue='';
            }      
            if(scale=='binary'){
                if(value==0){
                    value = 'No';
                }
                if(value>0) {
                    value= 'Yes';
                }
            }

            this._div.innerHTML = (id ?
                '<p><b>'+name+':</b> ' + value + '</p><p>'+displayValue+'</p>'
                : 'Hover for value');
        };

        info.addTo(map);

        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend')
            var grades = getScale(scale,minValue,maxValue);
            var classes = ['mapcolornone','mapcolor0','mapcolor1','mapcolor2','mapcolor3','mapcolor4'];

            div = createLegend(div,scale,grades,classes);

            return div;
        };

        legend.addTo(map);

        loadGeoms(bite.geom_url,bite.geom_attribute,bite.name_attribute,display);

        function getScale(scale){
            var grades = ['No Data', Number(minValue.toPrecision(3)), Number(((maxValue-minValue)/4+minValue).toPrecision(3)), Number(((maxValue-minValue)/4*2+minValue).toPrecision(3)), Number(((maxValue-minValue)/4*3+minValue).toPrecision(3)), Number(((maxValue-minValue)/4*4+minValue).toPrecision(3))]
            if(scale=='log'){
                grades.forEach(function(g,i){
                    if(i>0){
                        grades[i] = Number((Math.exp(((i-1)/4)*Math.log(maxValue - minValue))+minValue).toPrecision(3));
                    }
                });
            }
            if(scale=='binary'){
                grades = ['No Data',0,1];
            }
            return grades;
        }

        function createLegend(div,scale,grades,classes){
            if(scale=='binary'){
                div.innerHTML += '<i class="'+classes[0]+'"></i> No<br />';
                div.innerHTML += '<i class="'+classes[5]+'"></i> Yes<br />';
            } else {
                let html = '';
                for (var i = 0; i < grades.length; i++) {
                    html += '<p class="legendelement"><i class="'+classes[i]+'"></i> ';
                    html += isNaN(Number(grades[i])) ? grades[i] : Math.ceil(grades[i]);
                    html += ((i + 1)<grades.length ? i==0 ? '' : ' &ndash; ' + Math.floor(grades[i + 1]) + '' : '+');
                    html += '</p>';
                }
                div.innerHTML = html    
            }
            return div;
        }

        function loadGeoms(urls,geom_attributes,name_attributes){
            var total = urls.length;
            $('.infohover').html('Loading Geoms: '+total + ' to go');
            $.ajax({
                url: urls[0],
                dataType: 'json',
                success: function(result){
                    var geom = {};
                    if(result.type=='Topology'){
                      geom = topojson.feature(result,result.objects.geom);
                    } else {
                      geom = result;
                    }              
                    var layer = L.geoJson(geom,
                        {
                            style: styleClosure(geom_attributes[0]),
                            onEachFeature: onEachFeatureClosure(geom_attributes[0],name_attributes[0])
                        }
                    ).addTo(map);
                    if(urls.length>1){
                        loadGeoms(urls.slice(1),geom_attributes.slice(1),name_attributes.slice(1));
                    } else {
                        $('.infohover').html('Hover for value');
                        fitBounds();
                    }

                },
                error: function(err){
                    console.log(err);
                }
            });          
        }

        function onEachFeatureClosure(geom_attribute,name_attribute){
            return function onEachFeature(feature, layer) {
                var featureCode = feature.properties[geom_attribute];
                if(!isNaN(bite.lookup[featureCode])){
                  bounds.push(layer.getBounds());
                }
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: clickFeature,
                });
            }

            function highlightFeature(e) {
                if(clickOn===null){
                    info.update(e.target.feature.properties[name_attribute],e.target.feature.properties[geom_attribute]);
                }
            }

            function clickFeature(e) {
                info.update(e.target.feature.properties[name_attribute],e.target.feature.properties[geom_attribute]);
                if(clickOn == e.target.feature.properties[geom_attribute]){
                    clickOn=null;
                } else {
                    clickOn = e.target.feature.properties[geom_attribute];
                }
            }

            function resetHighlight(e) {
                if(clickOn===null){
                    info.update();
                }
            }   

        }

        function styleClosure(geom_attribute){
            return function style(feature) {
                return {
                    className: getClass(feature.properties[geom_attribute]),
                    weight: 1,
                    opacity: 1,
                    color: '#999999',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            }
        } 

        function getClass(id){
            var value = 0;
            var found = false;
            bite.bite.forEach(function(d){
                if(d[0]==id){
                    value=d[1];
                    found = true;
                }
            });
            if(found){
                //in future this should take the values calculated in grades/legend
                if(scale=='log'){
                    var maxDivide = Math.log(maxValue-minValue)
                    if(maxDivide ==0){return 'mapcolor'+4}
                    return 'mapcolor'+Math.floor(Math.log(value-minValue)/Math.log(maxValue-minValue)*4);
                } else if(scale=='binary'){
                    if(value>0){
                        return 'mapcolor4';
                    } else {
                        return 'mapcolor0';
                    }
                }
                else {
                    return 'mapcolor'+Math.floor((value-minValue)/(maxValue-minValue)*4);
                }
            } else {
                return 'mapcolornone';
            }
        }        
    }

    function fitBounds(){
        if(bounds.length>0){
            var fitBound = bounds[0];
            bounds.forEach(function(bound){
              if(fitBound._northEast.lat<bound._northEast.lat){
                fitBound._northEast.lat=bound._northEast.lat;
              }
              if(fitBound._northEast.lng<bound._northEast.lng){
                fitBound._northEast.lng=bound._northEast.lng;
              }
              if(fitBound._southWest.lng>bound._southWest.lng){
                fitBound._southWest.lng=bound._southWest.lng;
              }
              if(fitBound._southWest.lat>bound._southWest.lat){
                fitBound._southWest.lat=bound._southWest.lat;
              }                           
            });
            fitBound._northEast.lng=fitBound._northEast.lng+(fitBound._northEast.lng-fitBound._southWest.lng)*0.2;
            map.fitBounds(fitBound);
        }
    }        

}

function getColumn(data,tag){
    let column = null;
    data[1].forEach(function(d,i){
        if(d == tag){
            column = i;
        }
    });
    return column;
}