# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class DataTable(models.Model):
	on = models.IntegerField()
	dataSource =  models.CharField(max_length=2000)

	def __str__(self):
		return str(self.id) + str(' - ') + str(self.dash)

class TableField(models.Model):
	dataTable = models.ForeignKey(DataTable, related_name='tableField')
	columnNum = models.IntegerField()
	tag = models.CharField(max_length=200)


class MapBite(models.Model):
	displayField = models.CharField(max_length=200)
	scale = models.CharField(max_length=20)

	def __str__(self):
		return str(self.id) + str(' - ') + str(self.bite)

class BiteConfig(models.Model):
	variety = models.CharField(max_length=200)
	dataSource =  models.CharField(max_length=2000)
	title =  models.CharField(max_length=200, null=True, blank=True)
	biteID =  models.CharField(max_length=200)
	mapOptions = models.OneToOneField(MapBite, null=True, blank=True, related_name='bite')

	def __str__(self):
		return str(self.id) + str(' - ') + str(self.dash.first()) + str(' - ') + str(self.variety)

class FilterConfig(models.Model):
	text = models.CharField(max_length=200)
	tag = models.CharField(max_length=200)

	def __str__(self):
		return str(self.id)

class DashboardConfig(models.Model):
	title =  models.CharField(max_length=200, null=True, blank=True)
	subtext = models.CharField(max_length=2000, null=True, blank=True)
	grid = models.CharField(max_length=10)
	bites = models.ManyToManyField(BiteConfig, related_name='dash')
	filters = models.ManyToManyField(FilterConfig)
	editpassword = models.CharField(max_length=200, null=True, blank=True)
	viewpassword = models.CharField(max_length=200, null=True, blank=True)
	user = models.CharField(max_length=200, null=True, blank=True)
	org = models.CharField(max_length=200, null=True, blank=True)
	color = models.IntegerField()
	dataTable = models.OneToOneField(DataTable, null=True, blank=True, related_name='dash')

	def __str__(self):
		return str(self.id) + str(' - ') + str(self.title)
