hxlBites._chartBites = [];


//[14,15,16,17,19,20]
// chart bites to do with activities!
// what being #activity, #sector

// chart less than 10 and count rows

hxlBites._chartBites.push({
'id':'chart0001',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'what','tags':['#activity-code-id','#sector-code-id']}],
'criteria':['what > 1', 'what < 11'],
'variables': ['what', 'count()'],
'chart':'',
'title':'Count of {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0010',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'what','tags':['#activity-code-id','#sector-code-id']}],
'criteria':['what > 10'],
'variables': ['what', 'count()'],
'chart':'rows(10)',
'title':'Top 10 of {1} by count',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0002',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'what','tags':['#activity-code-id','#sector-code-id']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['what > 1', 'what < 11'],
'variables': ['what', 'sum(value)'],
'chart':'',
'title':'Count of {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0003',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'what','tags':['#activity-code-id','#sector-code-id']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['what > 10'],
'variables': ['what', 'sum(value)'],
'chart':'rows(10)',
'title':'Top 10 of {1} by {2}',
'priority': 8,
});

// chart bites to do with organisations!
// what being #org, #group

// chart less than 10

hxlBites._chartBites.push({
'id':'chart0004',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'who','tags':['#org-id-code','#group-id-code']}],
'criteria':['who > 2', 'who < 11'],
'variables': ['who', 'count()'],
'chart':'',
'title':'Count of {1}',
'priority': 8,
});

//top 10 count

hxlBites._chartBites.push({
'id':'chart0012',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'who','tags':['#org-id-code','#group-id-code']}],
'criteria':['who > 10'],
'variables': ['who', 'count()'],
'chart':'rows(10)',
'title':'Top 10 of {1} by count',
'priority': 8,
});

// less than 10 value

hxlBites._chartBites.push({
'id':'chart0008',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'who','tags':['#org-id-code','#group-id-code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['who > 2', 'who < 11'],
'variables': ['who', 'sum(value)'],
'chart':'',
'title':'{2} by {1}',
'priority': 8,
});


// more than 10 value

hxlBites._chartBites.push({
'id':'chart0013',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'who','tags':['#org-id-code','#group-id-code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['who > 10'],
'variables': ['who', 'sum(value)'],
'chart':'rows(10)',
'title':'Top 10 of {1} by {2}',
'priority': 8,
});

//chart bites to do with where
//where being #country, #region, #adm, #loc

//where count under 10

hxlBites._chartBites.push({
'id':'chart0005',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'where','tags':['#country-code','#region-code','#adm1-code','#adm2-code','#adm3-code','#adm4-code','#loc-code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['where > 1', 'where < 11','value ! 0'],
'variables': ['where', 'count()'],
'chart':'',
'title':'Count of {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0006',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'where','tags':['#country-code','#region-code','#adm1-code','#adm2-code','#adm3-code','#adm4-code','#loc-code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['where > 10','value ! 0'],
'variables': ['where', 'count()'],
'chart':'rows(10)',
'title':'Top 10 of Count of {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0009',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'where','tags':['#country-code','#region-code','#adm1-code','#adm2-code','#adm3-code','#adm4-code','#loc-code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['where > 1','where < 11'],
'variables': ['where', 'sum(value)'],
'chart':'',
'title':'{2} by {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0018',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'where','tags':['#country-code','#region-code','#adm1-code','#adm2-code','#adm3-code','#adm4-code','#loc-code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value']}],
'criteria':['where > 10'],
'variables': ['where', 'sum(value)'],
'chart':'rows(10)',
'title':'Top 10 of {1} by {2}',
'priority': 8,
});

//charts to do with other text tags
//#indicator, #severity, #status, #event, #modality, #channel

//value by tag under 10

hxlBites._chartBites.push({
'id':'chart0007',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'indicator','tags':['#indicator-value-pct','#severity','#status','#event','#modality','#channel','#crisis','#respondee']},{'name':'value','tags':['#value','#affected','#population','#reached','#indicator+value']}],
'criteria':['indicator > 1','indicator < 11'],
'variables': ['indicator', 'sum(value)'],
'chart':'',
'title':'{2} by {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0011',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'indicator','tags':['#indicator-value-pct','#severity','#status','#group','#event','#modality','#channel','#crisis','#respondee']},{'name':'value','tags':['#value','#affected','#population','#reached','#indicator+value']}],
'criteria':['indicator > 2','indicator < 11','value ! 0'],
'variables': ['indicator', 'count()'],
'chart':'',
'title':'Count of {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0014',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'indicator','tags':['#indicator-value-pct','#severity','#status','#event','#modality','#channel','#crisis','#respondee']},{'name':'value','tags':['#value','#affected','#population','#reached','#indicator+value']}],
'criteria':['indicator > 10'],
'variables': ['indicator', 'sum(value)'],
'chart':'rows(10)',
'title':'Top 10 of {2} by {1}',
'priority': 8,
});

hxlBites._chartBites.push({
'id':'chart0015',
'type':'chart',
'subType':'row',
'ingredients':[{'name':'indicator','tags':['#indicator-value-pct','#severity','#status','#group','#event','#modality','#channel','#crisis','#respondee']},{'name':'value','tags':['#value','#affected','#population','#reached','#indicator+value']}],
'criteria':['indicator > 10','value ! 0'],
'variables': ['indicator', 'count()'],
'chart':'rows(10)',
'title':'Top 10 of count of {1}',
'priority': 8,
});

