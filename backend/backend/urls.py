from django.urls import include, path # u svakom
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('batches/', views.MetaBatchList.as_view()),
    path('batches/<int:pk>', views.MetaBatchDetail.as_view()),
    path('batches/<int:batchid>/tasks', views.MetaTaskListFromBatch.as_view()),
    path('tasks/', views.MetaTaskList.as_view()),
    path('tasks/<int:pk>', views.MetaTaskDetail.as_view()),
    # problem: negativni ID
]