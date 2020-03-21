# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.core.files.storage import FileSystemStorage
from django.db import models

fs = FileSystemStorage(location='/static/photos')


class Garbages(models.Model):
	lat = models.FloatField()
	lng = models.FloatField()
	markertype = models.IntegerField()
	full = models.BooleanField(default = False)
	broke = models.BooleanField(default = False)
	missing = models.BooleanField(default = False)
	time = models.TimeField()

	


class Reports(models.Model):
	lat = models.FloatField()
	lng = models.FloatField()
	descr = models.CharField(max_length=250, blank=True)
	image = models.ImageField(storage=fs)





