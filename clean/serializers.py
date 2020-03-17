from rest_framework import serializers
from .models import Garbages

class GarbagesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Garbages
		fields = ('id','lat','lng','markertype','full','broke','missing','time')