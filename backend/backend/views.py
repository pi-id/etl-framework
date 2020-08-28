from django.shortcuts import render
from rest_framework import generics 
from .serializers import *
from .models import *
import logging
logger = logging.getLogger(__name__)

class MetaBatchList(generics.ListCreateAPIView):  
    queryset = MetaBatch.objects.all()
    serializer_class = MetaBatchSerializer  
    
    
class MetaBatchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaBatch.objects.all()
    serializer_class = MetaBatchSerializer    
    
  
class MetaTaskList(generics.ListCreateAPIView):  
    queryset = MetaTask.objects.all()
    serializer_class = MetaTaskSerializer
    
    
class MetaTaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaTask.objects.all()
    serializer_class = MetaTaskSerializer


class MetaTaskListFromBatch(generics.ListCreateAPIView):
    model = MetaTask
    serializer_class = MetaTaskSerializer
    def get_queryset(self): 
        queryset = MetaTask.objects.all()
        batchid = self.kwargs['batchid']
        return queryset.filter(batch_sid=batchid)

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
        
        
class MetaDatasourceList(generics.ListCreateAPIView):
    queryset = MetaDatasource.objects.all()
    serializer_class = MetaDatasourceSerializer
