from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.sites.shortcuts import get_current_site  
from django.utils.encoding import force_bytes, force_text  
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode  
from django.template.loader import render_to_string


from django.contrib.auth import (
	authenticate,
	get_user_model,
	login,
	logout
)

from .forms import UserLoginForm, UserRegisterForm
from .tokens import account_activation_token  
from django.contrib.auth.models import User  
from django.core.mail import EmailMessage


def login_view(request):
	next = request.GET.get('next')
	form = UserLoginForm(request.POST or None)
	if form.is_valid():
		username = form.cleaned_data.get('username')
		password = form.cleaned_data.get('password')
		user = authenticate(username = username, password = password)
		login(request, user)
		if next:
			return redirect(next)
		return redirect('/home')
	context = {
		'form': form,
	}
	return render(request, "login.html", context)	
	

def register_view(request):  
	next = request.GET.get('next')
	form = UserRegisterForm(request.POST or None)
	if form.is_valid():  
		user = form.save(commit=False)
		password = form.cleaned_data.get('password')
		user.set_password(password)  
		user.is_active = False  
		user.save()  
		current_site = get_current_site(request)  
		mail_subject = 'Activate your account.'  
		message = render_to_string('acc_active_email.html', {  
			'user': user,  
			'domain': current_site.domain,  
			'uid': urlsafe_base64_encode(force_bytes(user.id)),  
			'token': account_activation_token.make_token(user),  
		})  
		to_email = form.cleaned_data.get('email')  
		email = EmailMessage(  
			mail_subject, message, to=[to_email]  
		)  
		email.send()  
		return HttpResponse('Please confirm your email address to complete the registration.<a href="http://127.0.0.1:8000/">Back Home</a> ')  
	context = {
		'form': form,
	}
	return render(request, "singup.html", context)  
	


def activate(request, uidb64, token):  
	try:  
		uid = force_text(urlsafe_base64_decode(uidb64))  
		user = User.objects.get(id=uid)  
	except(TypeError, ValueError, OverflowError, User.DoesNotExist):  
		user = None  
	if user is not None and account_activation_token.check_token(user, token):  
		user.is_active = True  
		user.save()  
		return HttpResponse('Thank you for your email confirmation. Now you can  <a href="http://127.0.0.1:8000/accounts/login/">Login</a>')  
	else:  
		return HttpResponse('Activation link is invalid!')



def logout_view(request):
	logout(request)
	return redirect('/')

