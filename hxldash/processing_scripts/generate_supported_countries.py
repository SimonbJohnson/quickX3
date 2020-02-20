import os
import csv
#params
cutOffLevel = 4
rootdir = '../static/gz/'


#script variables
countries = []
countryList = []
fileList = {}


for subdir, dirs, files in os.walk(rootdir):
    for file in files:
    	filePath = os.path.join(subdir, file)
        level = filePath[-9]
        print filePath
        print level
        country = filePath[-13:-10]
        print country
        if country not in countries:
        	countries.append(country)
        	countryList.append({'countryname':'','iso3':country})
        	fileList[country] = [0,0,0,0]
        addtotable = False
        try:
        	level = int(level)
        	addtotable = True
        except:
        	print filePath
        	print 'Not a geom file'
        if addtotable == True and level<cutOffLevel:
        	fileList[country][level] = os.path.getsize(filePath)

print fileList


with open('iso3_lookup.csv', 'rU') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
    	iso3 = row[0]
    	found = False
    	countryname = row[1]
    	for country in countryList:
    		if country['iso3'] == row[0]:
    			country['countryname'] = countryname

countryList.sort(key=lambda x: x['countryname'], reverse=False)

print countryList

#generate table
output = []

for country in countryList:
	row = '<tr><td>{{country}}</td><td class="{{admin1class}}">{{admin1}}</td><td class="{{admin2class}}">{{admin2}}</td><td class="{{admin3class}}">{{admin3}}</td></tr>'
	for level in range(1,4):
		iso3 = country['iso3']
		size = round(fileList[iso3][level]/1024)
		replace = 'admin'+str(level)
		cssclass="sizenone"
		text = "No"
		if size>0:
			text = 'Yes ('+str(size)+'KB)'
			cssclass="sizesmall"
			if size>100:
				cssclass="sizemedium"
			if size>250:
				cssclass="sizelarge"
			if size>500:
				cssclass="sizevlarge"
		row = row.replace('{{'+replace+'class}}',cssclass)
		row = row.replace('{{'+replace+'}}',text)
		row = row.replace('{{country}}',country['countryname'])
	print row
