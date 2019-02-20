# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from models import DashboardConfig,BiteConfig,FilterConfig

import urllib
import json

def index(request):
	return render(request, 'hxldash/datachooser.html')

def create(request,url):
	data = {}
	if url[0:7]=="https:/" and url[7]!="/":
		url = "https://"+url[7:]
	if url[0:6]=="http:/" and url[6]!="/":
		url = "http://"+url[6:]
	data['dataURL'] = url 
	return render(request, 'hxldash/dashmaker.html', data)

def save(request):
	if request.method == 'POST':
		jsonstring = urllib.unquote(request.POST['formconfig'])
		config = json.loads(jsonstring)
		dashConfig = DashboardConfig()
		dashConfig.title = config['title']
		dashConfig.subtext = config['subtext']
		dashConfig.grid = config['grid']
		dashConfig.editpassword = ''
		dashConfig.viewpassword = ''
		dashConfig.user = ''
		dashConfig.org = ''
		dashConfig.headlinefigures = 0
		dashConfig.save()
		dashID = dashConfig.id
		for headline in config['headlinefigurecharts']:
			hl = BiteConfig.objects.create(variety = 'headline', dataSource = headline['data'], biteID = headline['chartID'])
			dashConfig.bites.add(hl)
		for chart in config['charts']:
			ch = BiteConfig.objects.create(variety = 'chart', dataSource = chart['data'], biteID = chart['chartID'])
			dashConfig.bites.add(ch)
		for filt in config['filters']:
			ft = FilterConfig.objects.create(text=filt['text'],tag=filt['tag'])
			dashConfig.filters.add(ft)
	
	return render(request, 'hxldash/dashsave.html', {'dashID':dashID})

def view(request,id):
	dashConfig = DashboardConfig.objects.get(pk=id)
	config = {
		"title":"",
		"subtext":"",
		"filtersOn":False,
		"filters":[],
		"headlinefigures":0,
		"headlinefigurecharts":[],
		"grid":"",
		"charts":[]
	}
	config['title'] = dashConfig.title
	config['subtext'] = dashConfig.subtext
	config['grid'] = dashConfig.grid
	for bite in dashConfig.bites.all():
		if bite.biteID!="[u'']" and len(bite.dataSource)>1:
			if bite.variety=='headline' :
				config['headlinefigurecharts'].append({'data':bite.dataSource,'chartID':bite.biteID})
				config['headlinefigures'] = config['headlinefigures'] +1
			else:
				config['charts'].append({'data':bite.dataSource,'chartID':bite.biteID})
	for filt in dashConfig.filters.all():
		print filt
		if filt.text!='':
			config['filtersOn'] = True
			config['filters'].append({'text':filt.text,'tag':filt.tag})

	return render(request, 'hxldash/dashview.html', {'config':json.dumps(config).replace("u''","")})
