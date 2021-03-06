hxlBites._mapBites = [{
'id':'map0001',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code','#adm3+code']}],
'criteria':['where > 1'],
'variables': ['where', 'count()'],
'map':'',
'title':'Count of reports by {1}',
'priority': 10,
},
{
'id':'map0002',
'type':'map',
'subType':'choropleth',
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code','#adm3+code']},{'name':'value','tags':['#value','#affected','#population','#reached','#targeted','#inneed','#indicator+value','#capacity']}],
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
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code','#adm3+code']},{'name':'org','tags':['#org-code']}],
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
'ingredients':[{'name':'where','tags':['#country+code','#adm1+code','#adm2+code','#adm3+code']},{'name':'people','tags':['#contact-email']}],
'criteria':['where > 1'],
'variables': ['where', 'countDistinct(people)'],
'map':'',
'title':'Distinct Count of {2} by {1}',
'priority': 10,
}];

hxlBites._mapValues = {'world':[
		{'name':'world_iso3','level':0,'url':'/static/geoms/world.json','codes':[
				{'name':'ISO3','values':['ABW','AFG','AGO','AIA','ALB','ALD','AND','ARE','ARG','ARM','ASM','ATA','ATC','ATF','ATG','AUS','AUT','AZE','BDI','BEL','BEN','BFA','BGD','BGR','BHR','BHS','BIH','BLM','BLR','BLZ','BMU','BOL','BRA','BRB','BRN','BTN','BWA','CAF','CAN','CHE','CHL','CHN','CIV','CMR','COD','COG','COK','COL','COM','CPV','CRI','CUB','CUW','CYM','CYN','CYP','CZE','DEU','DJI','DMA','DNK','DOM','DZA','ECU','EGY','ERI','ESP','EST','ETH','FIN','FJI','FLK','FRA','FRO','FSM','GAB','GBR','GEO','GGY','GHA','GIN','GMB','GNB','GNQ','GRC','GRD','GRL','GTM','GUM','GUY','HKG','HMD','HND','HRV','HTI','HUN','IDN','IMN','IND','IOA','IOT','IRL','IRN','IRQ','ISL','ISR','ITA','JAM','JEY','JOR','JPN','KAS','KAZ','KEN','KGZ','KHM','KIR','KNA','KOR','KOS','KWT','LAO','LBN','LBR','LBY','LCA','LIE','LKA','LSO','LTU','LUX','LVA','MAC','MAF','MAR','MCO','MDA','MDG','MDV','MEX','MHL','MKD','MLI','MLT','MMR','MNE','MNG','MNP','MOZ','MRT','MSR','MUS','MWI','MYS','NAM','NCL','NER','NFK','NGA','NIC','NIU','NLD','NOR','NPL','NRU','NZL','OMN','PAK','PAN','PCN','PER','PHL','PLW','PNG','POL','PRI','PRK','PRT','PRY','PSX','PYF','QAT','ROU','RUS','RWA','SAH','SAU','SDN','SDS','SEN','SGP','SGS','SHN','SLB','SLE','SLV','SMR','SPM','SRB','STP','SUR','SVK','SVN','SWE','SWZ','SXM','SYC','SYR','TCA','TCD','TGO','THA','TJK','TKM','TLS','TON','TTO','TUN','TUR','TWN','TZA','UGA','UKR','URY','USA','UZB','VAT','VCT','VEN','VGB','VIR','VNM','VUT','WLF','WSM','YEM','ZAF','ZMB','ZWE','SOM']},
				{'name':'ISO2','values':['AE','AF','AG','AL','AM','AO','AR','AT','AU','AZ','BA','BB','BD','BE','BF','BG','BH','BI','BJ','BN','BO','BR','BS','BT','BW','BY','BZ','CA','CD','CF','CG','CH','CI','CL','CM','CN','CO','CR','CU','CV','CY','CZ','DE','DJ','DK','DM','DO','DZ','EC','EE','EG','ER','ES','ET','FI','FJ','FM','FR','GA','GB','GD','GE','GH','GM','GN','GQ','GR','GT','GW','GY','HN','HR','HT','HU','ID','IE','IL','IN','IQ','IR','IS','IT','JM','JO','JP','KE','KG','KH','KI','KM','KN','KP','KR','KW','KZ','LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY','MA','MD','ME','MG','MH','MK','ML','MM','MN','MR','MT','MU','MV','MW','MX','MY','MZ','NA','NE','NG','NI','NL','NO','NP','NR','NZ','OM','PA','PE','PG','PH','PK','PL','PS','PT','PW','PY','QA','RO','RS','RU','RW','SA','SB','SC','SD','SE','SG','SI','SK','SL','SN','SO','SR','SS','ST','SV','SY','SZ','TD','TG','TH','TJ','TL','TM','TN','TO','TR','TT','TV','TZ','UA','UG','US','UY','UZ','VC','VE','VN','VU','WS','YE','ZA','ZM','ZW']}
			]
		},
	],
	'cod':[
		{'iso3':'AGO', 'iso2':'AO', 'use':'AO', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'BDI', 'iso2':'BI', 'use':'BDI', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'BEN', 'iso2':'BJ', 'use':'BJ', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'BFA', 'iso2':'BF', 'use':'BF', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'BGD', 'iso2':'BD', 'use':'BD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,2]},
		{'iso3':'BOL', 'iso2':'BO', 'use':'BO', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'BRA', 'iso2':'BR', 'use':'BR', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'CAF', 'iso2':'CF', 'use':'CF', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'CIV', 'iso2':'CI', 'use':'CI', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'CMR', 'iso2':'CM', 'use':'CM', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'COD', 'iso2':'CD', 'use':'CD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'COG', 'iso2':'CG', 'use':'CG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'COL', 'iso2':'CO', 'use':'CO', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'COM', 'iso2':'KM', 'use':'KM', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'ECU', 'iso2':'EC', 'use':'EC', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'EGY', 'iso2':'EG', 'use':'EG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'ETH', 'iso2':'ET', 'use':'ET', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'GBR', 'iso2':'GB', 'use':'GBR', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[2,3]},
		{'iso3':'GEO', 'iso2':'GE', 'use':'GE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'GIN', 'iso2':'GN', 'use':'GN', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'GTM', 'iso2':'GT', 'use':'GT', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'HTI', 'iso2':'HT', 'use':'HT', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'IDN', 'iso2':'ID', 'use':'IDN', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'IRN', 'iso2':'IR', 'use':'IR', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'IRQ', 'iso2':'IQ', 'use':'IQ', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'KDN', 'iso2':'KD', 'use':'KDN', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'KEN', 'iso2':'KE', 'use':'KE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'KGZ', 'iso2':'KG', 'use':'KG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'KHM', 'iso2':'KH', 'use':'KH', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'LAO', 'iso2':'LA', 'use':'LA', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'LBN', 'iso2':'LB', 'use':'LB', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'LBR', 'iso2':'LR', 'use':'LR', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'LBY', 'iso2':'LY', 'use':'LY', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'LKA', 'iso2':'LK', 'use':'LK', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'MLI', 'iso2':'ML', 'use':'ML', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'MMR', 'iso2':'MR', 'use':'MMR', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'MOZ', 'iso2':'MZ', 'use':'MZ', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'MRT', 'iso2':'MT', 'use':'MT', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'MWI', 'iso2':'MW', 'use':'MW', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'NAM', 'iso2':'NA', 'use':'NA', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'NER', 'iso2':'NE', 'use':'NE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'NGA', 'iso2':'NG', 'use':'NG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'NPL', 'iso2':'NP', 'use':'NP', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'PAK', 'iso2':'PK', 'use':'PK', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'PNG', 'iso2':'PG', 'use':'PG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'PRK', 'iso2':'PG', 'use':'PG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'PSE', 'iso2':'PS', 'use':'PS', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'SDN', 'iso2':'SD', 'use':'SD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'SEN', 'iso2':'SN', 'use':'SN', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'SLE', 'iso2':'SL', 'use':'SL', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'SOM', 'iso2':'SO', 'use':'SO', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'SSD', 'iso2':'SS', 'use':'SS', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'SYR', 'iso2':'SS', 'use':'SS', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'TCD', 'iso2':'TD', 'use':'TD', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'TGO', 'iso2':'TG', 'use':'TG', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'THA', 'iso2':'TH', 'use':'TH', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2,3]},
		{'iso3':'UKR', 'iso2':'UA', 'use':'UA', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1]},
		{'iso3':'VEN', 'iso2':'VE', 'use':'VE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'VUT', 'iso2':'VU', 'use':'VU', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'YEM', 'iso2':'YE', 'use':'YE', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'ZBM', 'iso2':'ZM', 'use':'ZM', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'ZWE', 'iso2':'ZW', 'use':'ZW', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'admin{{level}}Pcode','name_att':'admin{{level}}Name','levels':[1,2]},
		{'iso3':'CDH', 'iso2':'CD', 'use':'CDH', 'url':'/static/geoms/topojson/{{country}}/{{level}}/geom.json','adjustment':0,'code_att':'ZSCode','name_att':'Nom','levels':[2]},
	]};
