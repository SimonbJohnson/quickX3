hxlBites._timeSeriesBites = [
{
'id':'time0001',
'type':'chart',
'subType':'line',
'ingredients':[{'name':'date','tags':['#date-report-reported-update']}],
'criteria':['date > 4'],
'variables': ['date', 'count()'],
'chart':'',
'title':'Count of {1}',
'priority': 8,
},
{
'id':'time0002',
'type':'chart',
'subType':'line',
'ingredients':[{'name':'date','tags':['#date-report-reported-update']},{'name':'value','tags':['#value','#affected','#reached','#indicator+value','#population']}],
'criteria':['date > 4'],
'variables': ['date', 'sum(value)'],
'chart':'',
'title':'{2} by {1}',
'priority': 8,
}
];