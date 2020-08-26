from django.shortcuts import render
from rest_framework import viewsets # 1
from rest_framework import generics # 2
from .serializers import MetaBatchSerializer, MetaTaskSerializer
from .models import MetaBatch, MetaTask


# drugi nacin: rest_framework generics + APIView
    
class MetaBatchList(generics.ListCreateAPIView):   #generics.ListCreateAPIView):
    queryset = MetaBatch.objects.all()
    serializer_class = MetaBatchSerializer
    
class MetaBatchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MetaBatch.objects.all()
    serializer_class = MetaBatchSerializer
        

class MetaTaskListFromBatch(generics.ListCreateAPIView):
    model = MetaTask
    serializer_class = MetaTaskSerializer
    def get_queryset(self): # vlastita funkcija koja ce uz pomoc Batch Id-a dohvatit njegove taskove
        queryset = MetaTask.objects.all()
        batchid = self.kwargs['batchid']
        return queryset.filter(batch_sid=batchid)
        
        
class MetaTaskListFromBatch(generics.ListCreateAPIView):
    model = MetaBatch
