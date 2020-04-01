from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache


def homepage(request):
	if request.user.is_active:
		return redirect('/home')
	return render(request, "index.html", {})

@never_cache
@login_required
def home(request):
	if request.user.is_superuser:
		return render(request, "AdminHome.html", {})
	elif request.user.is_active: 
		return render(request, "UsersHome.html", {})


@never_cache		
@login_required
def request_view(request):
	return render(request, "request.html", {})


@never_cache		
@login_required
def success_view(request):
	return render(request, "success.html", {})	


@never_cache		
@login_required
def add_view(request):
	return render(request, "addGarbage.html", {})

@never_cache		
@login_required
def reports_view(request):
	if request.user.is_superuser:
		return render(request, "viewReports.html", {})

		


	
	