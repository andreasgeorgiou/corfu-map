# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .models import Garbages
from .serializers import GarbagesSerializer


class GarbagesView(viewsets.ModelViewSet):
	queryset = Garbages.objects.all()
	serializer_class = GarbagesSerializer
