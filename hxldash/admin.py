# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import DashboardConfig, BiteConfig, FilterConfig, MapBite

# Register your models here.
admin.site.register(DashboardConfig)
admin.site.register(BiteConfig)
admin.site.register(FilterConfig)
admin.site.register(MapBite)