# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Garbages, Reports

# Register your models here.
admin.site.register(Garbages)
admin.site.register(Reports)