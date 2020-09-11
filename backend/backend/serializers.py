from rest_framework import serializers

from .models import *
"""
Serializeri služe za
serijalizaciju modela u JSON i 
deserijalizaciju JSON-a u model.
Članska varijabla "fields" služi da 
definiranje atributa koji će biti prikazani u JSON-u.
"""
 
class MetaBatchSerializer(serializers.ModelSerializer):
    datasource_name = serializers.CharField(source = 'datasource_sid.datasource_name', read_only = True)
    class Meta:
        model = MetaBatch
        fields = [field.name for field in model._meta.fields]
        fields.append('datasource_name')
        
     
class MetaTaskSerializer(serializers.ModelSerializer):
    batch_name = serializers.CharField(source = 'batch_sid.batch_name', read_only = True)
    dependent_task_name = serializers.CharField(source = 'dependent_task_sid.task_name', read_only = True)
    class Meta:
        model = MetaTask
        fields = [field.name for field in model._meta.fields]
        fields.append('batch_name')
        fields.append('dependent_task_name')
    
    
class MetaDependencySerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaDependency
        fields = "__all__"

        
class MetaDependencyTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaDependencyTask
        fields = "__all__"
        
        
class MetaDatasourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaDatasource
        fields = ['datasource_sid', 'datasource_name']
        

class MetaObjectSerializer(serializers.ModelSerializer):
        datasource_name = serializers.CharField(source = 'datasource_sid.datasource_name', read_only = True)
        object_type_name = serializers.CharField(source = 'object_type_sid.object_type_name', read_only = True)
        class Meta:
            model = MetaObject
            fields = [field.name for field in model._meta.fields]
            fields.append('datasource_name')
            fields.append('object_type_name')


class MetaObjectTaskSerializer(serializers.ModelSerializer):
    source_object_name = serializers.CharField(source = 'source_object_sid.object_name', read_only = True)
    target_object_name = serializers.CharField(source = 'target_object_sid.object_name', read_only = True)
    task_name = serializers.CharField(source = 'task_sid.task_name', read_only = True)
    class Meta:
        model = MetaObjectTask
        fields = [field.name for field in model._meta.fields]
        fields.append('source_object_name')
        fields.append('target_object_name')
        fields.append('task_name')

 
class MetaObjectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaObjectType
        fields = "__all__"


class MetaAttributeSerializer(serializers.ModelSerializer):
    task_name = serializers.CharField(source = 'task_sid.task_name', read_only = True)
    class Meta:
        model = MetaAttribute
        fields = [field.name for field in model._meta.fields]
        fields.append('task_name')
        
        
class DependencyBatchRecursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DependencyBatchRecursion
        fields = "__all__"
        
class DependencyTaskRecursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DependencyTaskRecursion
        fields = "__all__"
        
        
class DomainValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainValue
        fields = ['domain_value_value']