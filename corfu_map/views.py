from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def homepage(request):
	return render(request, "index.html", {})

@login_required
def home(request):
	if request.user.is_superuser:
		return render(request, "AdminHome.html", {})
	elif request.user.is_active: 
		return render(request, "UsersHome.html", {})
		
@login_required
def request_view(request):
	return render(request, "request.html", {})	


	
	