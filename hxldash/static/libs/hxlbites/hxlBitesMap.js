hxlBites._mapBites = [{
'id':'map0001',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code']}],
'criteria':['where > 1'],
'variables': ['where', 'count()'],
'map':'',
'title':'Count of reports',
'priority': 10,
},
{
'id':'map0002',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value','#capacity']}],
'criteria':['where > 1'],
'variables': ['where', 'sum(value)'],
'map':'',
'title':'Map of {2} by {1}',
'priority': 10,
},
{
'id':'map0003',
'type':'map',
'subType':'point',
'ingredients':[{'name':'lat','tags':['#geo+lat']},{'name':'lon','tags':['#geo+lon']}],
'criteria':['lat > 0','lon > 0'],
'variables': ['lat', 'lon'],
'map':'',
'title':'Map of locations',
'priority': 10,
},
{
'id':'map0004',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code']},{'name':'org','tags':['#org-code']}],
'criteria':['where > 1'],
'variables': ['where', 'countDistinct(org)'],
'map':'',
'title':'Distinct Count of {2} by {1}',
'priority': 10,
},
{
'id':'map0005',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code']},{'name':'people','tags':['#contact-email']}],
'criteria':['where > 1'],
'variables': ['where', 'countDistinct(people)'],
'map':'',
'title':'Distinct Count of {2} by {1}',
'priority': 10,
}];

hxlBites._mapValues = {'world':[
		{'name':'world_iso3','level':0,'url':'/static/geoms/world.json','codes':[
				{'name':'ISO_A3','values':['ABW','AFG','AGO','AIA','ALB','ALD','AND','ARE','ARG','ARM','ASM','ATA','ATC','ATF','ATG','AUS','AUT','AZE','BDI','BEL','BEN','BFA','BGD','BGR','BHR','BHS','BIH','BLM','BLR','BLZ','BMU','BOL','BRA','BRB','BRN','BTN','BWA','CAF','CAN','CHE','CHL','CHN','CIV','CMR','COD','COG','COK','COL','COM','CPV','CRI','CUB','CUW','CYM','CYN','CYP','CZE','DEU','DJI','DMA','DNK','DOM','DZA','ECU','EGY','ERI','ESP','EST','ETH','FIN','FJI','FLK','FRA','FRO','FSM','GAB','GBR','GEO','GGY','GHA','GIN','GMB','GNB','GNQ','GRC','GRD','GRL','GTM','GUM','GUY','HKG','HMD','HND','HRV','HTI','HUN','IDN','IMN','IND','IOA','IOT','IRL','IRN','IRQ','ISL','ISR','ITA','JAM','JEY','JOR','JPN','KAS','KAZ','KEN','KGZ','KHM','KIR','KNA','KOR','KOS','KWT','LAO','LBN','LBR','LBY','LCA','LIE','LKA','LSO','LTU','LUX','LVA','MAC','MAF','MAR','MCO','MDA','MDG','MDV','MEX','MHL','MKD','MLI','MLT','MMR','MNE','MNG','MNP','MOZ','MRT','MSR','MUS','MWI','MYS','NAM','NCL','NER','NFK','NGA','NIC','NIU','NLD','NOR','NPL','NRU','NZL','OMN','PAK','PAN','PCN','PER','PHL','PLW','PNG','POL','PRI','PRK','PRT','PRY','PSX','PYF','QAT','ROU','RUS','RWA','SAH','SAU','SDN','SDS','SEN','SGP','SGS','SHN','SLB','SLE','SLV','SMR','SPM','SRB','STP','SUR','SVK','SVN','SWE','SWZ','SXM','SYC','SYR','TCA','TCD','TGO','THA','TJK','TKM','TLS','TON','TTO','TUN','TUR','TWN','TZA','UGA','UKR','URY','USA','UZB','VAT','VCT','VEN','VGB','VIR','VNM','VUT','WLF','WSM','YEM','ZAF','ZMB','ZWE','SOM']}
			]
		},
	],
	'cod':[
		{'iso3':'BDI', 'iso2':'BI', 'use':'BDI', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'MLI', 'iso2':'ML', 'use':'ML', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'NGA', 'iso2':'NG', 'use':'NG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'CAF', 'iso2':'CF', 'use':'CF', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'BFA', 'iso2':'BF', 'use':'BF', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'CIV', 'iso2':'CI', 'use':'CI', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'COD', 'iso2':'CD', 'use':'CD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'COL', 'iso2':'CO', 'use':'CO', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'GIN', 'iso2':'GN', 'use':'GN', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'SLE', 'iso2':'SL', 'use':'SL', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'AGO', 'iso2':'AO', 'use':'AO', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'BGD', 'iso2':'BD', 'use':'BD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'CMR', 'iso2':'CM', 'use':'CM', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'EGY', 'iso2':'EG', 'use':'EG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'GTM', 'iso2':'GT', 'use':'GT', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'HND', 'iso2':'HD', 'use':'HD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'HTI', 'iso2':'HT', 'use':'HT', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'IRQ', 'iso2':'IQ', 'use':'IQ', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'KDN', 'iso2':'KD', 'use':'KDN', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'KEN', 'iso2':'KE', 'use':'KE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'KGZ', 'iso2':'KG', 'use':'KG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'KHM', 'iso2':'KH', 'use':'KH', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'LBN', 'iso2':'LB', 'use':'LB', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'MOZ', 'iso2':'MZ', 'use':'MZ', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'MRT', 'iso2':'MT', 'use':'MT', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'MWI', 'iso2':'MW', 'use':'MW', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'NER', 'iso2':'NE', 'use':'NE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'NPL', 'iso2':'NP', 'use':'NP', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'PAK', 'iso2':'PK', 'use':'PK', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'PSE', 'iso2':'PS', 'use':'PS', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'SDN', 'iso2':'SD', 'use':'SD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'SOM', 'iso2':'SO', 'use':'SO', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'SSD', 'iso2':'SS', 'use':'SS', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'TCD', 'iso2':'TD', 'use':'TD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'UKR', 'iso2':'UA', 'use':'UA', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'VEN', 'iso2':'VE', 'use':'VE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'VUT', 'iso2':'VU', 'use':'VU', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'YEM', 'iso2':'YE', 'use':'YE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},
		{'iso3':'ZWE', 'iso2':'ZW', 'use':'ZW', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}RefName'},

	]};