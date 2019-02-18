# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class BiteConfig(models.Model):
	variety = models.CharField(max_length=200)
	dataSource =  models.CharField(max_length=200)
	biteID =  models.CharField(max_length=200)
	editpassword = models.CharField(max_length=200)
	viewpassword = models.CharField(max_length=200)
	user = models.CharField(max_length=200)
	org = models.CharField(max_length=200)

class FilterConfig(models.Model):
	text = models.CharField(max_length=20)
	tag = models.CharField(max_length=20)

class DashboardConfig(models.Model):

	title =  models.CharField(max_length=200)
	subtext = models.CharField(max_length=200)
	grid = models.CharField(max_length=10)
	bites = models.ManyToManyField(BiteConfig)
	filters = models.ManyToManyField(FilterConfig)

