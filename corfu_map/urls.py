from django.contrib import admin
from django.urls import path, include

from .views import home,homepage,test

from accounts.views import login_view, register_view, logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', test),
    path('', homepage),
    path('home/', home),
    path('accounts/login/', login_view),
    path('accounts/register/', register_view),
    path('accounts/logout/', logout_view),
    path('api/', include('clean.urls'))
]

