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
    console.log('#chartcontainer'+id);
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