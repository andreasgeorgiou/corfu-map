from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('clean', views.GarbagesView)
router.register('reports', views.ReportsView)

urlpatterns = [
	path('', include(router.urls))

]
