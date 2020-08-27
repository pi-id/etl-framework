from rest_framework import serializers

from .models import *

class MetaBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaBatch
        fields = "__all__"
     
class MetaTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaTask
        fields = "__all__"
        
    
class MetaDependencySerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaDependency
        fields = "__all__"

        
class MetaDependencyTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaDependencyTask
        fields = "__all__"
        
        
class DependencyBatchRecursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DependencyBatchRecursion
        fields = "__all__"
        
class DependencyTaskRecursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DependencyTaskRecursion
        fields = "__all__"