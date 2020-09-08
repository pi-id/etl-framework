from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)


class MetaBatchList(APIView):
    """
    View za 3 HTTP metode:
    1. GET za dohvaćanje svih batcheva
    2. POST za stvaranje novoga batcha
    3. DELETE za brisanje batcheva čiji su id-evi predani preko URL-a.
    """
    def get(self, request, format = None):
        meta_batch_list = MetaBatch.objects.all()
        serializer = MetaBatchSerializer(meta_batch_list, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MetaBatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(insert_date = timezone.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        meta_batch_list = MetaBatch.objects.all()
        ids = self.request.query_params.get('ids', None)
        if ids is not None:
            ids = ids.split(',')
            meta_batch_list.filter(batch_sid__in=ids).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetaBatchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaBatch.objects.all()
    serializer_class = MetaBatchSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(update_date =  timezone.now())
        return Response(serializer.data)


#########################################################################################
class MetaTaskList(APIView):
    """
    View za 3 HTTP metode:
    1. GET
    2. POST
    3. DELETE
    """
    def get(self, request, format = None):
        meta_task_list = MetaTask.objects.all()
        serializer = MetaTaskSerializer(meta_task_list, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MetaTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(insert_date = timezone.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        meta_task_list = MetaTask.objects.all()
        ids = self.request.query_params.get('ids', None)
        if ids is not None:
            ids = ids.split(',')
            meta_task_list.filter(task_sid__in=ids).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetaTaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaTask.objects.all()
    serializer_class = MetaTaskSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(update_date =  timezone.now())
        return Response(serializer.data)


class MetaTaskListFromBatch(generics.ListCreateAPIView):
    model = MetaTask
    serializer_class = MetaTaskSerializer
    def get_queryset(self):
        queryset = MetaTask.objects.all()
        batchid = self.kwargs['batchid']
        return queryset.filter(batch_sid=batchid)


#################################################################################################


class MetaDependencyList(generics.ListCreateAPIView):
    queryset = MetaDependency.objects.all()
    serializer_class = MetaDependencySerializer


class MetaDependencyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaDependency.objects.all()
    serializer_class = MetaDependencySerializer


class MetaDependencyTaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaDependencyTask.objects.all()
    serializer_class = MetaDependencyTaskSerializer


class MetaDependencyTaskList(generics.ListCreateAPIView):
    queryset = MetaDependencyTask.objects.all()
    serializer_class = MetaDependencyTaskSerializer

#################################################################################################

class MetaObjectTaskList(APIView):
    """
    View za 3 HTTP metode:
    1. GET
    2. POST
    3. DELETE
    """
    def get(self, request, format = None):
        meta_object_task_list = MetaObjectTask.objects.all()
        serializer = MetaObjectTaskSerializer(meta_object_task_list, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MetaObjectTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(insert_date = timezone.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        meta_object_task_list = MetaObjectTask.objects.all()
        ids = self.request.query_params.get('ids', None)
        if ids is not None:
            ids = ids.split(',')
            meta_object_task_list.filter(object_task_sid__in=ids).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetaObjectTaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaObjectTask.objects.all()
    serializer_class = MetaObjectTaskSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(update_date =  timezone.now())
        return Response(serializer.data)


##########################################################################################

class MetaAttributeList(APIView):
    """
    View za 3 HTTP metode:
    1. GET
    2. POST
    3. DELETE
    """
    def get(self, request, format = None):
        meta_attribute_list = MetaAttribute.objects.all()
        serializer = MetaAttributeSerializer(meta_attribute_list, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MetaAttributeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        meta_attribute_list = MetaAttribute.objects.all()
        ids = self.request.query_params.get('ids', None)
        if ids is not None:
            ids = ids.split(',')
            meta_attribute_list.filter(attribute_id__in=ids).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetaAttributeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaAttribute.objects.all()
    serializer_class = MetaAttributeSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


################################################################################################

class MetaObjectList(APIView):
    """
    View za 3 HTTP metode:
    1. GET
    2. POST
    3. DELETE
    """
    def get(self, request, format = None):
        meta_object_list = MetaObject.objects.all()
        serializer = MetaObjectSerializer(meta_object_list, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MetaObjectSerializer(data=request.data)
        if serializer.is_valid():

            serializer.save(insert_date = timezone.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        meta_object_list = MetaObject.objects.all()
        ids = self.request.query_params.get('ids', None)
        if ids is not None:
            ids = ids.split(',')
            meta_object_list.filter(object_sid__in=ids).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetaObjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaObject.objects.all()
    serializer_class = MetaObjectSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(update_date=timezone.now())
        return Response(serializer.data)

################################################################################################


class DependencyBatchRecursionList(generics.ListCreateAPIView):
    model = DependencyBatchRecursion
    serializer_class = DependencyBatchRecursionSerializer
    def get_queryset(self):
        return DependencyBatchRecursion.objects.raw(
        """  with batch_dependency (dependency_sid, batch_sid, depends_on_batch_sid, level)  as
  (
  select dependency_sid, batch_sid, depends_on_batch_sid, 0
  from
  dbo.meta_dependency
  where depends_on_batch_sid = {}
  and dependency_status = 'Active'
  UNION ALL

  select d.dependency_sid, d.batch_sid, d.depends_on_batch_sid, r.level+1
  from dbo.meta_dependency d join batch_dependency r on d.depends_on_batch_sid = r.batch_sid
  where dependency_status = 'Active'
  )
  select batch_dependency.dependency_sid, batch.batch_name as batch_name, dependent_batch.batch_name as dependent_batch_name, level
  from batch_dependency
  join meta_batch batch on batch_dependency.batch_sid = batch.batch_sid
  join meta_batch dependent_Batch on batch_dependency.depends_on_batch_sid = dependent_batch.batch_sid
  order by level asc
        """.format(self.kwargs['batchid']))


class DependencyTaskRecursionList(generics.ListCreateAPIView):
    model = DependencyTaskRecursion
    serializer_class = DependencyTaskRecursionSerializer
    def get_queryset(self):
        return DependencyTaskRecursion.objects.raw(
        """ with task_dependency (task_dependency_sid, batch_sid, task_sid, depends_on_task_sid, level)  as
  (
  select task_dependency_sid, batch_sid, task_sid, depends_on_task_sid, 0
  from
  dbo.meta_dependency_task
  where batch_sid = {}
  and dependency_status = 'Active'
  UNION ALL

  select r.task_dependency_sid, r.batch_sid, d.task_sid, d.depends_on_task_sid, r.level+1
  from dbo.meta_dependency_task d join task_dependency r on d.depends_on_task_sid = r.task_sid
  where dependency_status = 'Active'
  )

  select task_dependency.task_dependency_sid, task_dependency.batch_sid, task.task_name as task_name, dependent_task.task_name as dependent_task_name, level
  from task_dependency
  join meta_task task on task_dependency.task_sid = task.task_sid
  join meta_task dependent_task on task_dependency.depends_on_task_sid = dependent_task.task_sid
  order by level asc
        """.format(self.kwargs['batchid']))


class MetaDatasourceList(APIView):
    """
    View za 3 HTTP metode:
    1. GET
    2. POST
    3. DELETE
    """
    def get(self, request, format = None):
        meta_datasource_list = MetaDatasource.objects.all()
        serializer = MetaDatasourceSerializer(meta_datasource_list, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MetaDatasourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(insert_date = timezone.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        meta_datasource_list = MetaDatasource.objects.all()
        ids = self.request.query_params.get('ids', None)
        if ids is not None:
            ids = ids.split(',')
            meta_datasource_list.filter(datasource_sid__in=ids).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetaDatasourceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaDatasource.objects.all()
    serializer_class = MetaDatasourceSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(update_date =  timezone.now())
        return Response(serializer.data)


class DomainValuesList(APIView):
    def get(self, request, format=None):
        target_name = self.request.query_params.get('name', None)
        target_sid = DomainDirectory.objects.all().filter(domain_directory_name=target_name).values('domain_directory_sid')
        target_sid = target_sid[0]['domain_directory_sid']
        domainvalues_list = DomainValue.objects.all().filter(domain_directory_sid=target_sid)
        serializer = DomainValueSerializer(domainvalues_list, many=True)
        try:
            return Response(serializer.data)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FilteredList(APIView):
    """
    API View koji služi za filtriranje proizvoljnog entiteta iz baze podataka
    prema proizvoljnom stupcu.
    """
    def get(self, request, format=None):
        target_entity = self.request.query_params.get('entity', None)
        target_key = self.request.query_params.get('key', None)
        target_value = self.request.query_params.get('value', None)

        models = {
        'batch' : MetaBatch,
        'task' : MetaTask,
        'object' : MetaObject,
        'attribute' : MetaAttribute,
        'object-task' : MetaObjectTask
        }

        serializers = {
        'batch' : MetaBatchSerializer,
        'task' : MetaTaskSerializer,
        'object' : MetaObjectSerializer,
        'attribute' : MetaAttributeSerializer,
        'object-task' : MetaObjectTaskSerializer
        }

        target_model = models.get(target_entity)
        target_serializer = serializers.get(target_entity)

        serializer = target_serializer(target_model.objects.all().filter(**{target_key : target_value}), many=True)
        try:
            return Response(serializer.data)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
