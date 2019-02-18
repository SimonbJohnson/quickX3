function loadData(dataURL){
	dataURL = dataURL.replace(/amp;/g,'');
	let proxyURL = 'https://proxy.hxlstandard.org/data.json?force=on&filter01=cut&cut-skip-untagged01=o&url=dataURL';
	proxyURL = proxyURL.replace('dataURL',encodeURIComponent(dataURL));
	$.ajax({
            url: proxyURL,
            success: function(result){
                dataSets.push(result);
                $('#status').html('<p>Data Loaded Successfully</p>');
                console.log(result);
                let matches = generateBites(result,dataURL);
                updateStatusForBites(bites,matches);

            },
            error: function(err){
            	console.log(err);
            	$('#status').html(err['responseJSON']['message']);
            }
    });
}

function updateStatusForBites(bites,matches){
	$('#status').append('<p>'+bites.charts.length+' chart(s) generated');
	$('#status').append('<p>'+bites.maps.length+' map(s)  generated');
	$('#status').append('<p>'+bites.crossTables.length+' cross table(s) generated');
	$('#status').append('<p>'+bites.headlines.length+' headline figure(s) generated');
	if(matches>2){
		$('#status').append('<div class="greencheck"><i class="check icon"></i></div>');
		setTimeout(function(){
			$('#status').slideUp()
		},1000)
		
	}
}

function generateBites(data,dataURL){
	let hb = hxlBites.data(data);
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
			createHeadLineFigure('#headlineselect'+headline,bite);
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

function injectLayouts(max){
	for(var i=0;i<max;i++){
		let current = i;
		let html = '<div id="layout'+i+'" class="col-md-3 layout"></div>';
		$('#layoutsegmentcontent').append(html);
		$.ajax({
            url: gridURL.replace('xxx',(current+1).toString()),
            success: function(result){
                $('#layout'+current).html(result);
                $('#layout'+current).on('click',function(){
                	$('#layoutchooser').slideUp();
                	$('#dashboardlayout').html(result);
                	$('#dashboardlayout .chart').each(function(index){
                		$(this).attr("id","dashchart"+index);
                		$( this ).html('<i id="chartedit'+index+'" data-id="'+index+'" class="plus circle icon large plusicon">');
                		$('#chartedit'+index).on('click',function(){
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
								$("#chartselect"+i).off();
								$("#chartselect"+i).on('click',function(){
									$('#chartmodal').modal('hide');
									createChart('#dashchart'+index,[chart.bite],true);
									config.charts[index].data = chart.data;
									config.charts[index].chartID = chart.bite.uniqueID;
								});
							});
           					bites.time.forEach(function(chart,i){
								$("#timeselect"+i).off();
								$("#timeselect"+i).on('click',function(){
									$('#chartmodal').modal('hide');
									createChart('#dashchart'+index,[chart.bite],true);
									config.charts[index].data = chart.data;
									config.charts[index].chartID = chart.bite.uniqueID;
								});
							});
							bites.maps.forEach(function(mp,i){
								$("#mapselect"+i).off();
								$("#mapselect"+i).on('click',function(){
									$('#chartmodal').modal('hide');
									createMap('#dashchart'+index,mp.bite);
									config.charts[index].data = mp.data;
									config.charts[index].chartID = mp.bite.uniqueID;
								});
							});
                		});
                	});
                });
            },
            error: function(err){
            	console.log(err);
            	$('#status').html(err['responseJSON']['message']);
            }
    	});
	}
}

$('.colorpick').on('click',function(){
	$('#colorchooser').slideUp();
});

$('#filterplus').on('click',function(){
	$('#filterchooser').slideDown();
});

$('#headlineplus').on('click',function(){
	$('#headlinechooser').slideDown();
});

$('.headlineselectbutton').on('click',function(){
	$('#headlinemodal').modal('show');
	var headlineNum = $(this).attr('data-id');
	bites.headlines.forEach(function(headline,i){
		$("#headlineselect"+i).off();
		$("#headlineselect"+i).on('click',function(){
			$('#headlinemodal').modal('hide');
			createHeadLineFigure('#headline'+headlineNum,headline.bite);
			config.headlinefigurecharts[headlineNum].data = headline.data;
			config.headlinefigurecharts[headlineNum].chartID = headline.bite.id;
		});
	});
});

$('.filterselectbutton').on('click',function(){
	$('#filtermodal').modal('show');
	var filterNum = $(this).attr('data-id');
	$("#addfilter").off();
	$("#addfilter").on('click',function(){
		$('#filtermodal').modal('hide');
		let val = $('#filterselect').val();
		$('#filter'+filterNum).html('<p>Filter for '+val+')</p>');
		config.filters[filterNum].text = val.split('(')[0];
		config.filters[filterNum].tag = val.split('(')[1];
	});
});

$('.menu .item').tab({'onVisible':function(){
		charts.forEach(function(chart){
			chart.update();
		});
	}
});

let bites = {'charts':[],'maps':[],'crossTables':[],'headlines':[],'time':[]};
let dataSets = [];
let charts = [];
loadData(dataURL);
injectLayouts(9);
