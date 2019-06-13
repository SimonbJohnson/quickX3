# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class MapBite(models.Model):
	displayField = models.CharField(max_length=200)
	scale = models.CharField(max_length=20)

class BiteConfig(models.Model):
	variety = models.CharField(max_length=200)
	dataSource =  models.CharField(max_length=2000)
	biteID =  models.CharField(max_length=200)
	mapOptions = models.OneToOneField(MapBite, null=True, blank=True)

	def __str__(self):
		return str(self.id)

class FilterConfig(models.Model):
	text = models.CharField(max_length=200)
	tag = models.CharField(max_length=200)

	def __str__(self):
		return str(self.id)

class DashboardConfig(models.Model):
	title =  models.CharField(max_length=200, null=True, blank=True)
	subtext = models.CharField(max_length=2000, null=True, blank=True)
	grid = models.CharField(max_length=10)
	bites = models.ManyToManyField(BiteConfig)
	filters = models.ManyToManyField(FilterConfig)
	editpassword = models.CharField(max_length=200, null=True, blank=True)
	viewpassword = models.CharField(max_length=200, null=True, blank=True)
	user = models.CharField(max_length=200, null=True, blank=True)
	org = models.CharField(max_length=200, null=True, blank=True)
	color = models.IntegerField()
