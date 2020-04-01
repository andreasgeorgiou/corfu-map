from rest_framework import serializers
from .models import Garbages, Reports


class GarbagesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Garbages
		read_only_fields = ('id','lat','lng','markertype','time')
		fields = ('id','lat','lng','markertype','full','broke','missing','time')



class ReportsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Reports
		fields = ('id','username','lat','lng','descr','image')

