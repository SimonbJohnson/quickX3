function init(){
    loadGrid(config);
}

function loadData(config){
    dataSets = [];
    config.charts.forEach(function(chart){
        if(chart.chartID!='[]'){
            var index = dataSets.indexOf(chart.data);
            if(index==-1){
                dataSets.push(chart.data);
                chart.data = dataSets.length-1;
            } else {
                chart.data = index;
            }
        }
    });

    if('headlinefigurecharts' in config){
        config.headlinefigurecharts.forEach(function(chart){
            var index = dataSets.indexOf(chart.data);
            if(index==-1){
                dataSets.push(chart.data);
                chart.data = dataSets.length-1;
            } else {
                chart.data = index;
            }
        });
    }

    if('latestdate' in config){
        var index = dataSets.indexOf(config.latestdate.data);
        if(index==-1){
            dataSets.push(config.latestdate.data);
            config.latestdate.data = dataSets.length-1;
        } else {
            config.latestdate.data = index;
        }
    }

    var dataSetLoaded=0;
    dataSets.forEach(function(dataSet,i){
        $.ajax({
            url: "https://proxy.hxlstandard.org/data.json?force=on&filter01=cut&cut-skip-untagged01=o&url="+encodeURIComponent(dataSet),
            success: function(result){
                dataSets[i] = result;
                dataSetLoaded++;
                if(dataSets.length == dataSetLoaded){
                    createDashboard(dataSets,dataSets,config);
                }
            }
        });                
    });
}

function loadGrid(config){
    let url = gridURL.replace('xxx',config.grid)
    $.ajax({
        url: url,
        success: function(result){
            $('#grid').html(result);
            loadData(config);
        }
    });    
}

function createDashboard(dataSets,filterDataSets,config){
    $('.sp-circle').remove();
    var height = $(window).height()- 100
    if(iframe){
        height = $(window).height()-450
        $('#editlink').html('');
    }
    $('.whole').height(height);
    $('.half').height(height/2-15);
    $('.quarter').height(height/4);
    $('.third').height(height/3);
    $('.twothird').height(height/3*2);
    $('.threequarter').height(height/4*3);

    $('#title').html('<h2>'+config.title+'</h2>');
    $('#description').html('<p>'+config.subtext+'</p>');
    if('latestdate' in config){
        var text = "Last Update: "+getLastDate(config,dataSets);
        $('#update').html(text);
    }
    if('headlinefigures' in config && config.headlinefigures>0){
        createHeadlineFigures(config.headlinefigures,config.headlinefigurecharts,filterDataSets);
    }
    if(dataSets==filterDataSets){
        if('filters' in config && config.filtersOn){
            createFilterBar(dataSets,config.filters,config);
        }
    }

    config.charts.forEach(function(chart,i){
        if(chart.chartID!='[]'){
            if(typeof chart.chartID === 'string'){
                chart.chartID = [chart.chartID];
            }
            var id = '#chart' + i;
            if(filterDataSets[chart.data].length==0){
                $(id).html('<p>No Data</p>');
            } else {
                var bites = [];
                chart.chartID.forEach(function(id){
                    bites.push(hxlBites.data(filterDataSets[chart.data]).reverse(id));
                });
                if(bites[0].type=='chart'){
                    if(chart.sort==undefined){
                        chart.sort = 'unsorted';
                    }
                    createChart(id,bites,chart.sort,chart.title);
                }
                if(bites[0].type=='crosstable'){
                    createCrossTable(id,bites[0]);
                }
                if(bites[0].type=='map'){
                    if(chart.mapOptions[0]==undefined){
                        chart.mapOptions[0] = {'scale':'linear','display':''};
                    }
                    createMap(id,bites[0],filterDataSets[chart.data],chart.mapOptions[0],chart.title);
                }
            }
        }        
    });
    $('.chartist-tooltip').css('top','0px');
    setColors(config.color)
}

function getLastDate(config,dataSets){
    var tag = config.latestdate.tag;
    var dataset = dataSets[config.latestdate.data];
    var found = false
    dataset[1].forEach(function(d,i){
        if(d==tag){
            found = i
        }
    });
    var values = []
    if(found!==false){
        dataset.forEach(function(row,i){
            if(i>1){
                values.push(row[found]);
            }
        });
        values.sort();
        values.reverse();
        return values[0];
    }
    else {
        return "No date given"
    }

}

function createFilterBar(dataSets,filters,config){
    filters.forEach(function(filter,i){
        $('#filter').append('<div id="filter'+i+'" class="col-sm-4 filter"></div>');
        $('#filter'+i).html('<div class="dropdown"><p class="filtertext">Filter for '+filter.text+':</p><p class="filterdrop"><select id="dropdown'+i+'"><option>No selection</option></select></div>');
    });
    createDropDowns(dataSets,filters,config);
}


function createDropDowns(dataSets,filters,config){
    var dropdowns = [];
    filters.forEach(function(filter,i){
        var values = []
        dataSets.forEach(function(dataset){
            hxl.wrap(dataset).getValues(filter.tag).forEach(function(v){
                values.push(v);
            })
            
        });
        var unique = values.filter(function(v,i,self){
            return self.indexOf(v) === i;
        }).sort(function(a,b){
            if(a > b){
                return 1;
            } else if (b > a){
                return -1;
            } else {
                return 0;
            }
        });
        unique.forEach(function(value){
            var label = value;
            if(label.length>25){
                label = label.substr(0,22)+'...';
            }
            $('#dropdown'+i).append('<option value="'+value+'"">'+label+'</option>');
        });
        $('#dropdown'+i).on('change',function(){
            var listFilters = filters.map(function(d,i){
                return {'tag':d.tag,'value':$('#dropdown'+i).val()}
            });
            filterDataSets(dataSets,listFilters,config);
        });
    });

}

function filterDataSets(dataSets,filters,config){
    var filteredDataSets = [];
    var hxlFilter = [];
    filters.forEach(function(v,i){
        if(v.value!='No selection'){
            hxlFilter.push({pattern: v.tag, test: v.value});
            //hxlFilter.push(v.tag+'='+v.value);
        }
    });
    if(hxlFilter.length==0){
        createDashboard(dataSets,dataSets,config);
    } else {
        dataSets.forEach(function(dataSet,i){
            filteredDataSets.push([]);
            hxlData = hxl.wrap(dataSet);
            hxlFilter.forEach(function(f,i){
                hxlData = hxlData.withRows(f)
            })
            hxlData.forEach(function(row,col,rowindex){
                if(rowindex==0){
                    filteredDataSets[i].push([]);
                    filteredDataSets[i].push([]);
                    row.columns.forEach(function(c,j){
                        filteredDataSets[i][0].push(c.header);
                        filteredDataSets[i][1].push(c.displayTag);
                    });
                }
                filteredDataSets[i].push([]);
                row.values.forEach(function(v,j){
                    filteredDataSets[i][rowindex+2].push(v);

                });
            });
        });
        createDashboard(dataSets,filteredDataSets,config);
    }
}

function createHeadlineFigures(count,charts,dataSets){
    charts.forEach(function(chart,i){
        var id="#headline"+i;
        
        if(dataSets[chart.data].length==0){
            $(id).html('No Data');
        } else {
            var bite = hxlBites.data(dataSets[chart.data]).reverse(chart.chartID);
            $('#headline').append('<div id="'+id.slice(1)+'" class="col-md-4 headlinefigure"></div>');
            createHeadLineFigure(id,bite,chart.title);
        }
    });
}

function setColors(num){
    $('#colourstyle').html('#filterline {border-bottom-color:'+colors[num]+'} .ct-legend .ct-series-0:before {background-color: '+colors[num]+';border-color:'+colors[num]+'} .circlepoint {stroke: '+colors[num]+';fill:'+colors[num]+'} .ct-series-a .ct-bar {stroke: '+colors[num]+'} .ct-series-a .ct-line {stroke: '+colors[num]+'} .mapcolor0 {fill: '+mapColors[num][0]+';background-color:'+mapColors[num][0]+';} .mapcolor1 {fill: '+mapColors[num][1]+';background-color:'+mapColors[num][1]+';} .mapcolor2 {fill: '+mapColors[num][2]+';background-color:'+mapColors[num][2]+';} .mapcolor3 {fill: '+mapColors[num][3]+';background-color:'+mapColors[num][3]+';} .mapcolor4 {fill: '+mapColors[num][4]+';background-color:'+mapColors[num][4]+';} .headlinenumber{border-bottom-color:'+colors[num]+'}');
    config.color = num;
}

var colors=['#E53935','#2196F3','#283593','#388E3C','#FDD835'];
var mapColors = [['#FFEBEE','#FFCDD2','#E57373','#F44336','#d70206'],['#E3F2FD','#90CAF9','#2196F3','#1976D2','#0D47A1'],['#C5CAE9','#7986CB','#3F51B5','#283593','#1A237E'],['#E8F5E9','#A5D6A7','#66BB6A','#388E3C','#1B5E20'],['#FFF9C4','#FFF176','#FDD835','#F9A825','#F57F17']];


init();