from django.urls import register_converter, include, path 
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from . import views, converters

register_converter(converters.NegativeIntConverter, 'negint')

urlpatterns = [
    path('batches/', views.MetaBatchList.as_view()),
    path('batches/<negint:pk>/', views.MetaBatchDetail.as_view()),
    path('batches/<negint:pk>/update/', views.MetaBatchDetail.as_view()),  # TODO: patch vs. put
    path('batches/<negint:pk>/delete/', views.MetaBatchDetail.as_view()),
    path('batches/create/', views.MetaBatchList.as_view()),
    path('batches/<negint:batchid>/tasks/', views.MetaTaskListFromBatch.as_view()),
    path('batches/<negint:batchid>/batch_dependencies/',  views.DependencyBatchRecursionList.as_view()),
    path('batches/<negint:batchid>/task_dependencies/', views.DependencyTaskRecursionList.as_view()),
    path('batches/<negint:batchid>/task_dependencies/insert/', views.MetaDependencyTaskList.as_view()),
    path('batches/<negint:batchid>/task_dependencies/<negint:pk>/update/', views.MetaDependencyTaskDetail.as_view()),
    path('batches/<negint:batchid>/task_dependencies/<negint:pk>/delete/', views.MetaDependencyTaskDetail.as_view()),
    path('tasks/', views.MetaTaskList.as_view()),
    path('tasks/<negint:pk>/', views.MetaTaskDetail.as_view()),
    path('tasks/<negint:pk>/update/', views.MetaTaskDetail.as_view()),
    path('tasks/<negint:pk>/delete/', views.MetaTaskDetail.as_view()),  
    path('tasks/create/', views.MetaTaskList.as_view())
]   