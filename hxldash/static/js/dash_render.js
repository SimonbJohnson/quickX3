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

function createHeadLineFigure(id,bite){
    var headlineHTML = '<div id="'+id.slice(1)+'text" class="headlinetext"></div><div id="'+id.slice(1)+'number" class="headlinenumber"></div>';
    $(id).html(headlineHTML);
    var text = bite.bite.split(':')[0];
    var number = String(parseInt(bite.bite.split(':')[1].replace(/[^0-9\.]/g, ''))).replace(/(<([^>]+)>)/ig,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $(id+'text').html(text);
    $(id+'number').html(number);
}

function createChart(id,bite,sort){

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
    var offset = 70;
    if(maxLength>30){
        offset = 120
    }
    var variables = [];
    bite.forEach(function(b){
        variables.push(b.title.split(' by ')[0]);
    });
    var title = '';
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
    $(id).addClass('chartcontainer');
    $(id).html('<div class="titlecontainer"><p class="bitetitle">'+title+'</p></div><div id="chartcontainer'+id.substring(1)+'" class="chartelement"></div>');
    id = id.substring(1);
    $('#chartcontainer'+id).height($('#'+id).height()-55);
    if(subtype=="row" || subtype=="pie"){
        bite[0].bite.forEach(function(d,i){
            if(i>0){
                var label = d[0];
                if(label.length>maxLength){
                    maxLength = label.length;
                }
                if(label.length>40){
                    label = label.substring(0,35)+'...'
                }
                labels.push(label);
                series.push(d[1]);
            }  
        });
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
    } else if (subtype=="pie") {

        bite[0].bite.forEach(function(d,i){
            if(i>0){
                var label = d[0];
                if(label.length>maxLength){
                    maxLength = label.length;
                }
                if(label.length>40){
                    label = label.substring(0,35)+'...'
                }
                labels.push(label);
                series.push(d[1]);
            }  
        });

        var data = {
          labels: labels,
          series: series
        };

        var options = {
          labelInterpolationFnc: function(value) {
            return value[6]
          }
        };

        var responsiveOptions = [
          ['screen and (min-width: 640px)', {
            chartPadding: 40,
            labelOffset: 80,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
              return value;
            }
          }],
          ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 40
          }]
        ];

        chart = new Chartist.Pie('#chartcontainer'+id, data, options, responsiveOptions);        
    } else {
        
        var dataSetsLines = [];
        bite.forEach(function(d,j){
            var data = d.bite.map(function(d,i){
                if(i>0){
                    return {'x':d[0].getTime(),'y':d[1]}
                }
            }).splice(1);
            dataSetsLines.push({name:variables[j],data:data});            
        });

        chart = new Chartist.Line('#chartcontainer'+id, {
            series: dataSetsLines
        }, {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          height: ($('#chartcontainer'+id).height() - 20) + 'px',
          showPoint: false,
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
            Chartist.plugins.tooltip()
            ]
        });        
    }
    return chart;   
}

function tooltip(meta,value){
    return niceNumber(value);
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

function createMap(id,bite,scale){
    var bounds = [];

    id = id.substring(1);

    $('#'+id).html('<p class="bitetitle">'+bite.title+'</p><div id="'+id+'map" class="map"></div>');

    var map = L.map(id+'map', { fadeAnimation: false }).setView([0, 0], 2);

    var maxValue = bite.bite[1][1];
    var minValue = bite.bite[1][1]-1;

    bite['lookup'] = {}

    bite.bite.forEach(function(d){
        if(d[1]>maxValue){
            maxValue = d[1];
        }
        if(d[1]-1<minValue){
            minValue = d[1]-1;
        }
        bite.lookup[d[0]] = d[1];
    });

    L.tileLayer.grayscale('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 14, minZoom: 1
    }).addTo(map);

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info infohover'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (name,id) {
        value = 'No Data';
        bite.bite.forEach(function(d){
                    if(d[0]==id){
                        value=d[1];
                    }
                }); 
                               
        this._div.innerHTML = (id ?
            '<b>'+name+':</b> ' + value
            : 'Hover for value');
    };

    info.addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend')
        var grades = ['No Data', Number(minValue.toPrecision(3)), Number(((maxValue-minValue)/4+minValue).toPrecision(3)), Number(((maxValue-minValue)/4*2+minValue).toPrecision(3)), Number(((maxValue-minValue)/4*3+minValue).toPrecision(3)), Number(((maxValue-minValue)/4*4+minValue).toPrecision(3))]
        if(scale=='log'){
            grades.forEach(function(g,i){
                if(i>0){
                    grades[i] = Number((Math.exp(((i-1)/4)*Math.log(maxValue - minValue))+minValue).toPrecision(3));
                }
            });
        }
        var classes = ['mapcolornone','mapcolor0','mapcolor1','mapcolor2','mapcolor3','mapcolor4'];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i class="'+classes[i]+'"></i> ';
            div.innerHTML += isNaN(Number(grades[i])) ? grades[i] : Math.ceil(grades[i]);
            div.innerHTML += (grades[i + 1] ? i==0 ? '<br>' : ' &ndash; ' + Math.floor(grades[i + 1]) + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
    console.log(bite);
    loadGeoms(bite.geom_url,bite.geom_attribute,bite.name_attribute);

    function loadGeoms(urls,geom_attributes,name_attributes){
        console.log(name_attributes);
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

            }
        });          

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

    function onEachFeatureClosure(geom_attribute,name_attribute){
        return function onEachFeature(feature, layer) {
            var featureCode = feature.properties[geom_attribute];
            if(!isNaN(bite.lookup[featureCode])){
              bounds.push(layer.getBounds());
            }
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
        }

        function highlightFeature(e) {
            info.update(e.target.feature.properties[name_attribute],e.target.feature.properties[geom_attribute]);
        }

        function resetHighlight(e) {
            info.update();
        }   

    }

    function styleClosure(geom_attribute){
        return function style(feature) {
            return {
                className: getClass(feature.properties[geom_attribute]),
                weight: 1,
                opacity: 1,
                color: '#cccccc',
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
            if(scale=='log'){
                var maxDivide = Math.log(maxValue-minValue)
                if(maxDivide ==0){return 'mapcolor'+4}
                return 'mapcolor'+Math.floor(Math.log(value-minValue)/Math.log(maxValue-minValue)*4);
            } else {
                return 'mapcolor'+Math.floor((value-minValue)/(maxValue-minValue)*4);
            }
        } else {
            return 'mapcolornone';
        }
    }        

}