from rest_framework import serializers

from .models import MetaBatch
from .models import MetaTask


class MetaBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaBatch
        fields = "__all__"
     
class MetaTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaTask
        fields = "__all__"
        

     