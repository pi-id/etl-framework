from django.urls import register_converter, include, path, re_path
from django.conf.urls import url
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from . import views, converters

register_converter(converters.NegativeIntConverter, 'negint')

urlpatterns = [
    path('batches/', views.MetaBatchList.as_view()),
    path('batches/<negint:pk>/', views.MetaBatchDetail.as_view()),
    path('batches/<negint:batchid>/tasks/', views.MetaTaskListFromBatch.as_view()),
    path('batches/<negint:batchid>/batch-dependencies/',  views.DependencyBatchRecursionList.as_view()),
    path('batches/<negint:batchid>/task-dependencies/', views.DependencyTaskRecursionList.as_view()),
    path('tasks/', views.MetaTaskList.as_view()),
    path('tasks/<negint:pk>/', views.MetaTaskDetail.as_view()),
    path('objects/', views.MetaObjectList.as_view()),
    path('objects/<negint:pk>/', views.MetaObjectDetail.as_view()),
    path('object-tasks/', views.MetaObjectTaskList.as_view()),
    path('object-tasks/<negint:pk>/', views.MetaObjectTaskDetail.as_view()),
    path('attributes/', views.MetaAttributeList.as_view()),
    path('attributes/<negint:pk>/', views.MetaAttributeDetail.as_view()),
    path('datasources/', views.MetaDatasourceList.as_view()),
    path('datasources/<negint:pk>/', views.MetaDatasourceDetail.as_view()),
    path('values/', views.DomainValuesList.as_view()),
    path('filter/', views.FilteredList.as_view())
]
