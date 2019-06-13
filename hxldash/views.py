# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import HttpResponse
from models import DashboardConfig,BiteConfig,FilterConfig
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.clickjacking import xframe_options_exempt

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

	place = url.find('%3A/')
	if url[place+4]!='/':
		url = url.replace('%3A/','%3A//')
	data['dataURL'] = url
	data['id'] = 1 
	data['config'] = {
		"title":"",
		"subtext":"",
		"filtersOn":False,
		"filters":[{"text":"","tag":""},{"text":"","tag":""},{"text":"","tag":""}],
		"headlinefigures":0,
		"headlinefigurecharts":[{"data":"",
		"chartID":""},
		{"data":"",
		"chartID":""},
		{"data":"",
		"chartID":""}],
		"grid":"",
		"color":0,
		"charts":[
			{"data":"",
			"chartID":[]
			},
			{"data":"",
			"chartID":[""]
			},						
			{"data":"",
			"chartID":[""]
			},						
			{"data":"",
			"chartID":[""]
			},						
			{"data":"",
			"chartID":[""]
			}
		]
	}
	data['create'] = True
	data['config'] = json.dumps(data['config'])
	return render(request, 'hxldash/dashmaker.html', data)

def save(request):
	if request.method == 'POST':
		jsonstring = urllib.unquote(request.POST['formconfig'])
		config = json.loads(jsonstring)
		dashConfig = DashboardConfig()
		dashConfig.title = config['title']
		dashConfig.subtext = config['subtext']
		dashConfig.grid = config['grid']
		dashConfig.color = config['color']
		editpassword = request.POST['editpassword'] 
		if editpassword != '':
			dashConfig.editpassword = make_password(request.POST['editpassword'])
		viewpassword = request.POST['viewpassword']
		if viewpassword != '':
			dashConfig.viewpassword = make_password(request.POST['viewpassword'])
		dashConfig.user = request.POST['user']
		dashConfig.org = request.POST['org']
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

def update(request,id):
	dashConfig = DashboardConfig.objects.get(pk=id)
	editpassword = dashConfig.editpassword	
	if editpassword != '':
		user = '';
		if 'user' in request.session:
			user = request.session['user']
		if check_password(user,editpassword)==False:
			return password(request,'edit',id)
	if request.method == 'POST':
		jsonstring = urllib.unquote(request.POST['formconfig'])
		config = json.loads(jsonstring)
		dashConfig.title = config['title']
		dashConfig.subtext = config['subtext']
		dashConfig.grid = config['grid']
		dashConfig.color = config['color']
		dashConfig.headlinefigures = 0
		dashConfig.save()
		for bite in dashConfig.bites.all():
			dashConfig.bites.remove(bite)
		for filt in dashConfig.filters.all():
			dashConfig.filters.remove(filt)
		for headline in config['headlinefigurecharts']:
			hl = BiteConfig.objects.create(variety = 'headline', dataSource = headline['data'], biteID = headline['chartID'])
			dashConfig.bites.add(hl)
		for chart in config['charts']:
			ch = BiteConfig.objects.create(variety = 'chart', dataSource = chart['data'], biteID = chart['chartID'])
			dashConfig.bites.add(ch)
		for filt in config['filters']:
			ft = FilterConfig.objects.create(text=filt['text'],tag=filt['tag'])
			dashConfig.filters.add(ft)
		return render(request, 'hxldash/dashsave.html', {'dashID':id})

def iframe(request,id):
	return view(request,id,True)

@xframe_options_exempt
def view(request,id,iframe=False):
	dashConfig = DashboardConfig.objects.get(pk=id)
	viewpassword = dashConfig.viewpassword
	print 'viewpassword'
	print viewpassword
	if viewpassword != '' and viewpassword != None:
		user = '';
		if 'user' in request.session:
			user = request.session['user']
		if check_password(user,viewpassword)==False:
			return password(request,'view',id)
	config = {
		"title":"",
		"subtext":"",
		"filtersOn":False,
		"filters":[],
		"headlinefigures":0,
		"headlinefigurecharts":[],
		"grid":"",
		"charts":[],
		"color":0
	}
	config['title'] = dashConfig.title
	config['subtext'] = dashConfig.subtext
	config['grid'] = dashConfig.grid
	config['color'] = dashConfig.color
	for bite in dashConfig.bites.all().order_by('id'):
		if bite.biteID!="[u'']" and len(bite.dataSource)>1:
			if bite.variety=='headline' :
				config['headlinefigurecharts'].append({'data':bite.dataSource,'chartID':bite.biteID})
				config['headlinefigures'] = config['headlinefigures'] +1
			else:
				try:
					mapOptions = [{'display':bite.mapOptions.displayField,'scale':bite.mapOptions.scale}]
				except:
					mapOptions = []
				config['charts'].append({'data':bite.dataSource,'chartID':bite.biteID,'mapOptions':mapOptions})
	for filt in dashConfig.filters.all().order_by('id'):
		if filt.text!='':
			config['filtersOn'] = True
			config['filters'].append({'text':filt.text,'tag':filt.tag})

	return render(request, 'hxldash/dashview.html', {'config':json.dumps(config).replace("u''",""),'id':id,'iframe':iframe})

def edit(request,id):
	dashConfig = DashboardConfig.objects.get(pk=id)
	editpassword = dashConfig.editpassword
	if editpassword != '':
		user = '';
		if 'user' in request.session:
			user = request.session['user']
		if check_password(user,editpassword)==False:
			return password(request,'edit',id)
	

	config = {
		"title":"",
		"subtext":"",
		"filtersOn":False,
		"filters":[],
		"headlinefigures":0,
		"headlinefigurecharts":[],
		"grid":"",
		"charts":[],
		"color":0
	}
	config['title'] = dashConfig.title
	config['subtext'] = dashConfig.subtext
	config['grid'] = dashConfig.grid
	config['color'] = dashConfig.color
	for bite in dashConfig.bites.all().order_by('id'):
		if bite.biteID!="[u'']" and len(bite.dataSource)>1:
			if bite.variety=='headline' :
				config['headlinefigurecharts'].append({'data':bite.dataSource,'chartID':bite.biteID})
				config['headlinefigures'] = config['headlinefigures'] +1
			else:
				config['charts'].append({'data':bite.dataSource,'chartID':bite.biteID})
	for filt in dashConfig.filters.all().order_by('id'):
		if filt.text!='':
			config['filtersOn'] = True
			config['filters'].append({'text':filt.text,'tag':filt.tag})
	if len(config['filters'])<3:
		for i in range(len(config['filters'])-1,3):
			config['filters'].append({'text':'','tag':''})
	if len(config['headlinefigurecharts'])<3:
		for i in range(len(config['headlinefigurecharts'])-1,3):
			config['headlinefigurecharts'].append({'data':'','chartID':''})
	if len(config['charts'])<5:
		for i in range(len(config['charts'])-1,5):
			config['charts'].append({'data':'','chartID':''})

	data = {}
	data['create'] = False
	data['dataURL'] = config['charts'][0]['data']
	data['config'] = json.dumps(config)
	data['id'] = id
	return render(request, 'hxldash/dashmaker.html', data)

def password(request,page,id):
	return render(request, 'hxldash/password.html', {'page':page,'id':id})

def setpassword(request,page,id):
	request.session['user'] = request.POST['viewpassword']
	return redirect('/'+page+'/'+id);

def catalogue(request):
	dashboards = []
	dashes = DashboardConfig.objects.all()
	for dash in dashes:
		dashboards.append({'title':dash.title,'org':dash.org,'user':dash.user,'id':dash.id})
	return render(request, 'hxldash/catalogue.html', {'dashboards':dashboards})	

