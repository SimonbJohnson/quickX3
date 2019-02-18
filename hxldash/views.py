# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'hxldash/datachooser.html')

def create(request,url):
    data = {}
    data['dataURL'] = url 
    return render(request, 'hxldash/dashmaker.html', data)

def save(request,url):
    if request.is_ajax():
        if request.method == 'POST':
            print 'Raw Data: "%s"' % request.body   
    return HttpResponse("OK")