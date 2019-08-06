function loadData(dataURL){
	dataURL = dataURL.replace(/amp;/g,'');
	let proxyURL = 'https://proxy.hxlstandard.org/data.json?force=on&filter01=cut&cut-skip-untagged01=o&url=dataURL';
	proxyURL = proxyURL.replace('dataURL',encodeURIComponent(dataURL));
	$.ajax({
            url: proxyURL,
            success: function(result){
                dataSets.push(result);
                $('#status').html('<p>Data Loaded Successfully</p>');
                let hb = hxlBites.data(result);
                let matches = generateBites(hb,result,dataURL);
                setColors(0,false);
                injectLayouts(hb,9);
                updateStatusForBites(bites,matches);
                tablefields(result);
            },
            error: function(err){
            	console.log(err);
            	$('#status').html('<p>'+err['statusText']+'</p>');
            	if(err['responseJSON']){
            		$('#status').append('<p>'+err['responseJSON']['message']+'</p>');
            	} else {
            		$('#status').append('<p>Please check data source has HXL tags and is accessible from the web (sharing is turned on)</p>');
            	}
            }
    });
}

function updateStatusForBites(bites,matches){
	$('#status').append('<p>'+bites.charts.length+' chart(s) generated</p>');
	$('#status').append('<p>'+bites.maps.length+' map(s)  generated</p>');
	$('#status').append('<p>'+bites.time.length+' time series chart(s) generated</p>');
	if(bites.time.length>0){
		$('#status').append('<p><b>As time series detected row charts and headline figures will filter to show latest date only.</b></p>');
	}
	$('#status').append('<p>'+bites.headlines.length+' headline figure(s) generated</p>');
	if(matches>2){
		$('#status').append('<div class="greencheck"><i class="check icon"></i></div>');
	}
}

function generateBites(hb,data,dataURL){
	
	let matches = 0;
	let headline = 0;
	let row = 0;
	let line = 0;
	let map = 0;
	hb.getChartBites().forEach(function(bite){
		matches++;
		bites.charts.push({'data':dataURL,'bite':bite});
		$('#chartcontent').append('<div class="col-md-4"><div id="chartselect'+row+'" class="chartedit"></div></div>');
		charts.push(createChart('#chartselect'+row,[bite],true));
		row++;
	});
	hb.getTimeSeriesBites().forEach(function(bite){
		bites.time.push({'data':dataURL,'bite':bite});
		$('#timecontent').append('<div class="col-md-4"><div id="timeselect'+line+'" class="timeedit"></div></div>');
		charts.push(createChart('#timeselect'+line,[bite],true));
		line++;
	});
	hb.getMapBites().forEach(function(bite){
		bites.maps.push({'data':dataURL,'bite':bite});
		$('#mapcontent').append('<div class="col-md-4"><div id="mapselect'+map+'" class="mapedit"><p>'+bite.title+'</p><img class="mappreview" src="'+mapPreviewURL+'"></div></div>');
		matches++;
		map++;
	});
	hb.getCrossTableBites().forEach(function(bite){
		bites.crossTables.push({'data':dataURL,'bite':bite});
		matches++;
	});
	hb.getTextBites().forEach(function(bite){
		if(bite.subtype == 'topline figure'){
			bites.headlines.push({'data':dataURL,'bite':bite});
			$('#headlinecontent').append('<div class="col-md-4"><div id="headlineselect'+headline+'" class="headlinefigure headlinefigureedit"></div></div>');
			createHeadLineFigure('#headlineselect'+headline,bite,null);
			matches++;
			headline++;
		}
		
	});
	let filters = [];
	for(let i = 0;i<data[0].length;i++){
		filters.push({'header':data[0][i],'tag':data[1][i]});
		$('#filterselect').append('<option value="'+data[0][i]+'('+data[1][i]+'">'+data[0][i]+'('+data[1][i]+')</option>')
	}
	return matches;
}

function populateEditor(hb){
	$('#create-title').val(config.title);
	$('#create-description').val(config.subtext);
	config.headlinefigurecharts.forEach(function(headline,i){
		$('#headlinechooser').slideDown();
		if(headline.chartID!=''){
			let bite = hb.reverse(headline.chartID);
			let head = {'data':headline.data,'bite':bite,'title':headline.title};
			addHeadline(head,i)
		}
	});
	populateCharts(hb);
    config.filters.forEach(function(filter,i){
    	if(filter.text!=''){
    		addFilter(i,filter.text+' ('+filter.tag+')');
    		$('#filterchooser').slideDown();
		}
    });
    setColors(config.color,true);
}

function populateCharts(hb){
	config.charts.forEach(function(chart,i){
		if(chart.chartID!=''){
			let bite = hb.reverse(chart.chartID);
			if(bite.type=='chart'){
				createChart('#dashchart'+i,[bite],true,chart.title);
				$('#dashchart'+i+' .bitetitle').append('<i data-id="'+i+'" class="edit icon editchartbutton"></i>');
				$('#dashchart'+i+' .editchartbutton').on('click',function(){
					chartOptions('chart',i);
				});
				$('#dashchart'+i+' .bitetitle').append('<i data-id="'+i+'" class="close icon deletechartbutton"></i>');
				$('#dashchart'+i+' .deletechartbutton').on('click',function(){
					chooseChart($(this).attr('data-id'));
				});
	        }
	        if(bite.type=='map'){
	            if(chart.mapOptions == null){
	                chart.mapOptions=[{'scale':'linear','display':''}];
	            }
	            if(chart.mapOptions[0]==undefined){
	                chart.mapOptions.push({'scale':'linear','display':''});
	            }
	            createMap('#dashchart'+i,bite,dataSets[0],chart.mapOptions[0],chart.title);
				$('#dashchart'+i+' .bitetitle').append('<i data-id="'+i+'" class="edit icon editchartbutton"></i>');
				$('#dashchart'+i+' .editchartbutton').on('click',function(){
					chooseChart($(this).attr('data-id'));
				});
	        }
	    }
    });
}

function injectLayouts(hb,max){
	for(var i=0;i<max;i++){
		let current = i;
		let html = '<div id="layout'+i+'" class="col-md-3 layout"></div>';
		$('#layoutsegmentcontent').append(html);
		$.ajax({
            url: gridURL.replace('xxx',(current+1).toString()),
            success: function(result){
            	if(current+1==config.grid){
            		$('#layoutchooser').slideUp();
            		insertLayout(result);
            		populateEditor(hb);
            	}
                $('#layout'+current).html(result);
                $('#layout'+current).on('click',function(){
                	$('#layoutchooser').slideUp();
                	config.grid = current+1;
                	insertLayout(result);
                	populateCharts(hb);
                });
            },
            error: function(err){
            	console.log(err);
            	$('#status').html(err['responseJSON']['message']);
            }
    	});
	}
}

function insertLayout(html){
	$('#dashboardlayout').html(html);
	$('#dashboardlayout .chart').each(function(index){
		$(this).attr("id","dashchart"+index);
		$( this ).html('<i id="chartedit'+index+'" data-id="'+index+'" class="plus circle icon large plusicon">');
		$('#chartedit'+index).on('click',function(){
			chooseChart(index);
		});
	});
}

function chooseChart(index){
	$('#chartmodal').modal({
		duration:0,
	    onVisible: function () {
	    	charts.forEach(function(chart){
	    		chart.update();
	    	});
	    	$('#chartmodal').modal('refresh');
	    }
	}).modal('show');
	bites.charts.forEach(function(chart,i){
		insertBiteClick('#chartselect',chart,i,index)
	});
	bites.time.forEach(function(chart,i){
		insertBiteClick('#timeselect',chart,i,index)
	});
	bites.maps.forEach(function(mp,i){
		insertBiteClick('#mapselect',mp,i,index)
	});	
}

function insertBiteClick(id,bite,i,index){
	$(id+i).off();
	$(id+i).on('click',function(){
		$('#chartmodal').modal('hide');
		if(bite.bite.type=='map'){
			createMap('#dashchart'+index,bite.bite,dataSets[0],{'scale':'linear','display':''});
		} else {
			createChart('#dashchart'+index,[bite.bite],true);
		}
		$('#dashchart'+index+' .bitetitle').append('<i data-id="'+index+'" class="edit icon editchartbutton"></i>');
		$('#dashchart'+index+' .editchartbutton').on('click',function(){
			chartOptions('chart',index);
		});
		$('#dashchart'+index+' .bitetitle').append('<i data-id="'+i+'" class="close icon deletechartbutton"></i>');
		$('#dashchart'+index+' .deletechartbutton').on('click',function(){
			chooseChart($(this).attr('data-id'));
		});
		config.charts[index].data = bite.data;
		config.charts[index].chartID = bite.bite.uniqueID;
		config.charts[index].title = null;
	});
}

function chartOptions(chartType,i){
	$('#chartoptionsmodal').modal('show');
	$('#savechartoptions').off();
	$('#newtitle').val('');
	$('#savechartoptions').on('click',function(){
		let newTitle = $('#newtitle').val();
		if(newTitle!=''){
			config.charts[i].title == newTitle;
			$('#dashchart'+i+' .bitetitletext').html(newTitle);
			config.charts[i].title = newTitle;
		}

		$('#chartoptionsmodal').modal('hide');
	});
}

function tablefields(data){
	data[0].forEach(function(d,i){
		let check = '';
		config.table.fields.forEach(function(f){
			if(i==f.column){
				check = 'checked';
			}
		});
		$('#tablefields').append('<li><p><input type="checkbox" data-id='+i+' '+check+'> '+d +'  - '+ data[1][i]+'</p></li>')
	});
}

function tableToConfig(){
	if($('.ui.toggle input').is(':checked')){
		var selected = [];
		$('#tablefields input:checked').each(function() {
		    selected.push($(this).attr('data-id'));
		});
		let table = {'fields':[],data:dataURL}
		selected.forEach(function(s){
			s = parseInt(s);
			table.fields.push({'column':s,'tag':dataSets[0][1][s]})
		});
		config.table = table;		
	} else {
		config.table = {'fields':[],data:dataURL};
	}

}

$('.colorpick').on('click',function(){
	let num = $(this).attr('data-id');
	setColors(num,true);
	$('#colorchooser').slideUp();
});

function setColors(num,setConfig){
	$('#colourstyle').html('.ct-legend .ct-series-0:before {background-color: '+colors[num]+';border-color:'+colors[num]+'} .circlepoint {stroke: '+colors[num]+';fill:'+colors[num]+'} .ct-series-a .ct-bar {stroke: '+colors[num]+'} .ct-series-a .ct-line {stroke: '+colors[num]+'} .mapcolor0 {fill: '+mapColors[num][0]+';background-color:'+mapColors[num][0]+';} .mapcolor1 {fill: '+mapColors[num][1]+';background-color:'+mapColors[num][1]+';} .mapcolor2 {fill: '+mapColors[num][2]+';background-color:'+mapColors[num][2]+';} .mapcolor3 {fill: '+mapColors[num][3]+';background-color:'+mapColors[num][3]+';} .mapcolor4 {fill: '+mapColors[num][4]+';background-color:'+mapColors[num][4]+';} .headlinenumber{border-bottom-color:'+colors[num]+'}');
	if(setConfig){
		config.color = num;
	}
	
}

$('#filterplus').on('click',function(){
	$('#filterchooser').slideDown();
});

$('#headlineplus').on('click',function(){
	$('#headlinechooser').slideDown();
});

$('.headlineselectbutton').on('click',function(){
	var headlineNum = $(this).attr('data-id');
	chooseHeadline(headlineNum);
});

function chooseHeadline(headlineNum){
	$('#headlinemodal').modal('show');
	bites.headlines.forEach(function(headline,i){
		$("#headlineselect"+i).off();
		$("#headlineselect"+i).on('click',function(){
			$('#headlinemodal').modal('hide');
			addHeadline(headline,headlineNum);
		});
	});
}

function addHeadline(headline,headlineNum){
	createHeadLineFigure('#headline'+headlineNum,headline.bite,headline.title);
	$('#headline'+headlineNum).append('<i data-id="'+headlineNum+'" class="edit icon large editchartbutton"></i>');
	$('#headline'+headlineNum+' .editchartbutton').on('click',function(){
		chooseHeadline(headlineNum);
	});	
	$('#headline'+headlineNum).append('<i data-id="'+headlineNum+'" class="close icon large deletechartbutton"></i>');
	$('#headline'+headlineNum +' .deletechartbutton').on('click',function(){
		config.headlinefigurecharts[headlineNum] = {"data":"","chartID":"","title":null};
		$('#headline'+headlineNum).html('<i data-id="'+headlineNum+'" class="plus circle icon large plusicon headlineselectbutton"></i>');
		$('.headlineselectbutton').on('click',function(){
			var headlineNum = $(this).attr('data-id');
			chooseHeadline(headlineNum);
		});		
	});	
	config.headlinefigurecharts[headlineNum].data = headline.data;
	config.headlinefigurecharts[headlineNum].chartID = headline.bite.uniqueID;
}

$('.filterselectbutton').on('click',function(){
	
	var filterNum = $(this).attr('data-id');
	chooseFilter(filterNum);
});

function chooseFilter(filterNum){
	$('#filtermodal').modal('show');
	$("#addfilter").off();
	$("#addfilter").on('click',function(){
		$('#filtermodal').modal('hide');
		let val = $('#filterselect').val();
		addFilter(filterNum,val);
	});	
}

function addFilter(filterNum,val){
	$('#filter'+filterNum).html('<p>Filter for '+val+'</p>');
	$('#filter'+filterNum).append('<i data-id="'+filterNum+'" class="edit icon large editchartbutton"></i>');
	$('#filter'+filterNum+' .editchartbutton').on('click',function(){
		chooseFilter($(this).attr('data-id'));
	});
	$('#filter'+filterNum).append('<i data-id="'+filterNum+'" class="close icon large deletechartbutton"></i>');
	$('#filter'+filterNum +' .deletechartbutton').on('click',function(){
		config.filters[filterNum] = {"text":"","tag":""};
		$('#filter'+filterNum).html('<i data-id="'+filterNum+'" class="plus circle icon large plusicon filterselectbutton"></i>');
		$('.filterselectbutton').on('click',function(){
			var filterNum = $(this).attr('data-id');
			chooseFilter(filterNum);
		});		
	});
	config.filters[filterNum].text = val.split('(')[0];
	config.filters[filterNum].tag = val.split('(')[1].split(')')[0];
}

$('#save').on('click',function(){
	config.title = $('#create-title').val();
	config.subtext = $('#create-description').val();
	tableToConfig();
	$('#formconfig').val(encodeURIComponent(JSON.stringify(config)));
	$('#savemodal').modal('show');
});

$('.menu .item').tab({'onVisible':function(){
		charts.forEach(function(chart){
			chart.update();
		});
	}
});

$('#layoutedit').on('click',function(){
	$('#layoutchooser').slideDown();
});

$('#styleedit').on('click',function(){
	$('#colorchooser').slideDown();
});

if(create=='True'){
	$('#updateform').remove();
} else {
	$('#saveform').remove();
	$('#form1').attr("action",'/update/'+id);
}

$('.ui.toggle').checkbox({
  onChecked: function () { $('#tableselect').show(); },
  onUnchecked: function () { $('#tableselect').hide(); }
});
if(config.table.fields.length==0){
	$('#tableselect').hide();
} else {
	$('#tablecheck').prop('checked', true);
}


let bites = {'charts':[],'maps':[],'crossTables':[],'headlines':[],'time':[]};
let dataSets = [];
let charts = [];
var colors=['#E53935','#2196F3','#283593','#388E3C','#FDD835'];
var mapColors = [['#FFEBEE','#FFCDD2','#E57373','#F44336','#d70206'],['#E3F2FD','#90CAF9','#2196F3','#1976D2','#0D47A1'],['#C5CAE9','#7986CB','#3F51B5','#283593','#1A237E'],['#E8F5E9','#A5D6A7','#66BB6A','#388E3C','#1B5E20'],['#FFF9C4','#FFF176','#FDD835','#F9A825','#F57F17']];
loadData(dataURL);
