import os
import csv
import gzip

#params
cutOffLevel = 4
rootdir = '../static/geoms/topojson/'


#script variables
countries = []
countryList = []
fileList = {}


for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        filePath = os.path.join(subdir, file)
        level = filePath[-11]
        country = filePath[-15:-12]
        print filePath
        print country
        print level
        if level.isdigit():
            inp = '../static/geoms/topojson/'+country+'/'+str(level)
            out = '../static/gz/'+country+'/'+str(level)
            if not os.path.exists(out):
                os.makedirs(out)
            with open(inp+'/geom.json', 'rb') as f_in, gzip.open(out+'/geom.gz', 'wb') as f_out:
                f_out.writelines(f_in)