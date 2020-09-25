# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics

from django.shortcuts import render,redirect
from rest_framework import viewsets, permissions
from .models import Garbages, Reports, Request
from .serializers import GarbagesSerializer, ReportsSerializer, RequestSerializer
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import (
	AllowAny,
	IsAuthenticated,
	IsAdminUser,
	)


class GarbagesView(viewsets.ModelViewSet):
	queryset = Garbages.objects.all()
	serializer_class = GarbagesSerializer

@permission_classes([IsAdminUser])
class ReportsView(viewsets.ModelViewSet):
	queryset = Reports.objects.all()
	serializer_class = ReportsSerializer

@permission_classes([IsAdminUser])
class RequestView(viewsets.ModelViewSet):
	queryset = Request.objects.all()
	serializer_class = RequestSerializer
	


@login_required
def update_full(request, pk):
	
	garbage=Garbages.objects.get(id=pk)
	garbage.full ="True"
	garbage.username = request.user.username
	garbage.save()

	return redirect('/home')
	

@login_required
def update_broke(request, pk):
	
	garbage=Garbages.objects.get(id=pk)
	garbage.broke ="True"
	garbage.username = request.user.username
	garbage.save()
	
	return redirect('/home')


@login_required
def update_missing(request, pk):
	
	garbage=Garbages.objects.get(id=pk)
	garbage.missing ="True"
	garbage.username = request.user.username
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
		return redirect('/success')
	return HttpResponseForbidden('allowed only via POST')


#Admin's and superusers's options
@login_required
def empty(request, pk):
	if request.user.is_superuser:
		garbage=Garbages.objects.get(id=pk)
		garbage.full ="False"
		garbage.save()
		return redirect('/home')
	else:
		return HttpResponse('You are not a SuperUser!')


@login_required
def fixed(request, pk):
	if request.user.is_superuser:
		garbage=Garbages.objects.get(id=pk)
		garbage.broke ="False"
		garbage.save()
		return redirect('/home')
	else:
		return HttpResponse('You are not a SuperUser!')

@login_required
def found(request, pk):
	if request.user.is_superuser:
		garbage=Garbages.objects.get(id=pk)
		garbage.missing ="False"
		garbage.save()
		return redirect('/home')
	else:
		return HttpResponse('You are not a SuperUser!')


@login_required
def delete(request, pk):
	if request.user.is_superuser:
		garbage=Garbages.objects.get(id=pk)
		garbage.delete()
		return redirect('/home')
	else:
		return HttpResponse('You are not a SuperUser!')

@login_required
def deleteReport(request, pk):
	if request.user.is_superuser:
		report=Reports.objects.get(id=pk)
		report.delete()
		return redirect('/viewReports')
	else:
		return HttpResponse('You are not a SuperUser!')



@login_required
def deleteRequest(request, pk):
	if request.user.is_superuser:
		request=Request.objects.get(id=pk)
		request.delete()
		return redirect('/viewRequest')
	else:
		return HttpResponse('You are not a SuperUser!')


@login_required
def add_garbage(request):
	if request.user.is_superuser:
		if request.method == 'POST':
			
			newlat = request.POST["lat"]
			newlng = request.POST["lng"]
			markertype = request.POST["markertype"]
			newGarbage= Garbages(lat=newlat,lng=newlng,markertype=markertype,full="False",
								broke="False",missing="False",time="12:00:00")
			newGarbage.save()
		return redirect('/home')
	else:
		return HttpResponse('You are not a SuperUser')


@login_required
def requestadd_garbage(request):
		if request.method == 'POST':
			name = request.user.username
			newlat = request.POST["lat"]
			newlng = request.POST["lng"]
			markertype = request.POST["markertype"]
			newRequest= Request(username=name,lat=newlat,lng=newlng,markertype=markertype)
			newRequest.save()
			return redirect('/thanks2')
		else:
			return HttpResponse('Something Wrong!')