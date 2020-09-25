from django.contrib import admin
from django.urls import path, include

from .views import home, homepage, request_view, success_view, add_view, reports_view, requestadd_view, UserRequest_view, verify_view, thanks_view, thanks2_view
from clean.views import update_full, update_broke, update_missing, add_report, empty, fixed, found, delete, deleteReport, deleteRequest, add_garbage, requestadd_garbage
from accounts.views import login_view, register_view, logout_view, activate

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', homepage),
    path('admin/', admin.site.urls),
    path('home/', home),
    path('request/', UserRequest_view),
    path('request/add_report/', add_report, name="add_report"),
    path('accounts/login/', login_view),
    path('accounts/register/', register_view),
    path('activate/<uidb64>/<token>/',activate,name='activate'),
    path('accounts/logout/', logout_view),
    path('full/<str:pk>/',update_full, name="update_full"),
    path('broke/<str:pk>/',update_broke, name="update_broke"),
    path('missing/<str:pk>/',update_missing, name="update_missing"),
    path('empty/<str:pk>/',empty, name="empty"),
    path('fixed/<str:pk>/',fixed, name="fixed"),
    path('found/<str:pk>/',found, name="found"),
    path('delete/<str:pk>/',delete, name="delete"),
    path('deleteReport/<str:pk>/',deleteReport, name="deleteReport"),
    path('add/', add_view),
    path('add/garbage/', add_garbage, name="add_garbage"),
    path('viewReports/', reports_view),
    path('api/', include('clean.urls')),
    path('success/', success_view),
    path('requestadd/', requestadd_view),
    path('requestadd/garbage/', requestadd_garbage, name="requestadd_garbage"),
    path('viewRequest/', request_view),
    path('deleteRequest/<str:pk>/',deleteRequest, name="deleteRequest"),
    path('verify/', verify_view),
    path('thanks/', thanks_view),
    path('thanks2/', thanks2_view),
    
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
