# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class MapBite(models.Model):
	displayField = models.CharField(max_length=200)

class BiteConfig(models.Model):
	variety = models.CharField(max_length=200)
	dataSource =  models.CharField(max_length=2000)
	biteID =  models.CharField(max_length=200)
	display = models.OneToOneField(MapBite, null=True, blank=True)

	def __str__(self):
		return str(self.id)

class FilterConfig(models.Model):
	text = models.CharField(max_length=200)
	tag = models.CharField(max_length=200)

	def __str__(self):
		return str(self.id)

class DashboardConfig(models.Model):
	title =  models.CharField(max_length=200)
	subtext = models.CharField(max_length=2000)
	grid = models.CharField(max_length=10)
	bites = models.ManyToManyField(BiteConfig)
	filters = models.ManyToManyField(FilterConfig)
	editpassword = models.CharField(max_length=200)
	viewpassword = models.CharField(max_length=200)
	user = models.CharField(max_length=200)
	org = models.CharField(max_length=200)
	color = models.IntegerField()
