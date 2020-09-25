from rest_framework import serializers
from .models import Garbages, Reports, Request


class GarbagesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Garbages
		read_only_fields = ('id','lat','lng','markertype','full','broke','missing','time','username')
		fields = ('id','lat','lng','markertype','full','broke','missing','time','username')



class ReportsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Reports
		fields = ('id','username','lat','lng','descr','image')


class RequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = Request
		fields = ('id','username','lat','lng','markertype')

