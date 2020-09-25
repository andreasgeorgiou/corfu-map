# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models




class Garbages(models.Model):
	lat = models.FloatField()
	lng = models.FloatField()
	markertype = models.IntegerField()
	full = models.BooleanField(default = False)
	broke = models.BooleanField(default = False)
	missing = models.BooleanField(default = False)
	time = models.TimeField()
	username = models.CharField(blank=True, max_length=50)

	


class Reports(models.Model):
	
	username = models.CharField(max_length=50, default='SOME STRING')
	lat = models.FloatField()
	lng = models.FloatField()
	descr = models.TextField(blank=True)
	image = models.ImageField(upload_to='photos')



class Request(models.Model):
	
	username = models.CharField(max_length=50, default='SOME STRING')
	lat = models.FloatField()
	lng = models.FloatField()
	markertype = models.IntegerField()





