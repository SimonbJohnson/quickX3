hxlBites._mapBites = [{
'id':'map0001',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code']}],
'criteria':['where > 0'],
'variables': ['where', 'count()'],
'map':'',
'title':'Count of reports',
'priority': 10,
},
{
'id':'map0002',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code']},{'name':'value','tags':['#value','#affected','#indicator','#population']}],
'criteria':['where > 0'],
'variables': ['where', 'sum(value)'],
'map':'',
'title':'Map of {2}',
'priority': 10,
}];

hxlBites._mapValues = {'world':[
		{'name':'world_iso3','level':0,'url':'world.json','codes':[
				{'name':'ISO_A3','values':['ABW','AFG','AGO','AIA','ALB','ALD','AND','ARE','ARG','ARM','ASM','ATA','ATC','ATF','ATG','AUS','AUT','AZE','BDI','BEL','BEN','BFA','BGD','BGR','BHR','BHS','BIH','BLM','BLR','BLZ','BMU','BOL','BRA','BRB','BRN','BTN','BWA','CAF','CAN','CHE','CHL','CHN','CIV','CMR','COD','COG','COK','COL','COM','CPV','CRI','CUB','CUW','CYM','CYN','CYP','CZE','DEU','DJI','DMA','DNK','DOM','DZA','ECU','EGY','ERI','ESP','EST','ETH','FIN','FJI','FLK','FRA','FRO','FSM','GAB','GBR','GEO','GGY','GHA','GIN','GMB','GNB','GNQ','GRC','GRD','GRL','GTM','GUM','GUY','HKG','HMD','HND','HRV','HTI','HUN','IDN','IMN','IND','IOA','IOT','IRL','IRN','IRQ','ISL','ISR','ITA','JAM','JEY','JOR','JPN','KAS','KAZ','KEN','KGZ','KHM','KIR','KNA','KOR','KOS','KWT','LAO','LBN','LBR','LBY','LCA','LIE','LKA','LSO','LTU','LUX','LVA','MAC','MAF','MAR','MCO','MDA','MDG','MDV','MEX','MHL','MKD','MLI','MLT','MMR','MNE','MNG','MNP','MOZ','MRT','MSR','MUS','MWI','MYS','NAM','NCL','NER','NFK','NGA','NIC','NIU','NLD','NOR','NPL','NRU','NZL','OMN','PAK','PAN','PCN','PER','PHL','PLW','PNG','POL','PRI','PRK','PRT','PRY','PSX','PYF','QAT','ROU','RUS','RWA','SAH','SAU','SDN','SDS','SEN','SGP','SGS','SHN','SLB','SLE','SLV','SMR','SPM','SRB','STP','SUR','SVK','SVN','SWE','SWZ','SXM','SYC','SYR','TCA','TCD','TGO','THA','TJK','TKM','TLS','TON','TTO','TUN','TUR','TWN','TZA','UGA','UKR','URY','USA','UZB','VAT','VCT','VEN','VGB','VIR','VNM','VUT','WLF','WSM','YEM','ZAF','ZMB','ZWE','SOM']}
			]
		},
	],
	'cod':[
		{'iso3':'BDI', 'iso2':'BI', 'use':'BDI', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'MLI', 'iso2':'ML', 'use':'ML', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':1,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'NGA', 'iso2':'NG', 'use':'NG', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'CAF', 'iso2':'CF', 'use':'CF', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'BFA', 'iso2':'BF', 'use':'BF', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'CIV', 'iso2':'CI', 'use':'CI', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'COD', 'iso2':'CD', 'use':'CD', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'COL', 'iso2':'CO', 'use':'CO', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'GIN', 'iso2':'GN', 'use':'GN', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':1,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'SLE', 'iso2':'SL', 'use':'SL', 'url':'https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson','adjustment':1,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},

	]};