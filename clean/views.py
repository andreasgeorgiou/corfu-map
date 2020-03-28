# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics

from django.shortcuts import render,redirect
from rest_framework import viewsets, permissions
from .models import Garbages, Reports
from .serializers import GarbagesSerializer, ReportsSerializer
from django.contrib.auth.decorators import login_required



class GarbagesView(viewsets.ModelViewSet):
	queryset = Garbages.objects.all()
	serializer_class = GarbagesSerializer


class ReportsView(viewsets.ModelViewSet):
	queryset = Reports.objects.all()
	serializer_class = ReportsSerializer


@login_required
def update_full(request, pk):
	
	garbage=Garbages.objects.get(id=pk)
	garbage.full ="True"
	garbage.save()

	return redirect('/home')
	

@login_required
def update_broke(request, pk):
	
	garbage=Garbages.objects.get(id=pk)
	garbage.broke ="True"
	garbage.save()
	
	return redirect('/home')


@login_required
def update_missing(request, pk):
	
	garbage=Garbages.objects.get(id=pk)
	garbage.missing ="True"
	garbage.save()
	
	return redirect('/home')

@login_required
def add_report(request):
	if request.method == 'POST':
		name = request.user.username
		newlat = request.POST["lat"]
		newlng = request.POST["lng"]
		newdescription = request.POST["comment"]
		newimg = request.FILES["img"]
		newReport= Reports(username=name,lat=newlat,lng=newlng,descr=newdescription,image=newimg)
		newReport.save()
		return redirect('/home')
	return HttpResponseForbidden('allowed only via POST')