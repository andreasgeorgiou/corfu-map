from django.contrib import admin
from django.urls import path, include

from .views import home,homepage,request_view
from clean.views import update_full,update_broke,update_missing,add_report
from accounts.views import login_view, register_view, logout_view, activate

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homepage),
    path('home/', home),
    path('request/', request_view),
    path('request/add_report/', add_report, name="add_report"),
    path('accounts/login/', login_view),
    path('accounts/register/', register_view),
    path('activate/<uidb64>/<token>/',activate,name='activate'),
    path('accounts/logout/', logout_view),
    path('full/<str:pk>/',update_full, name="update_full"),
    path('broke/<str:pk>/',update_broke, name="update_broke"),
    path('missing/<str:pk>/',update_missing, name="update_missing"),
    path('api/', include('clean.urls')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
