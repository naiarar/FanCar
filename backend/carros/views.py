from django.shortcuts import render
from rest_framework import generics
from .models import Carros
from serializers import CarrosSerializer
class CarrosListCreate(generics.ListCreateAPIView):
    queryset = Carros.objects.all()
    serializer_class = CarrosSerializer

class CarrosRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Carros.objects.all()
    serializer_class = CarrosSerializer

class CarrosUpdateView(generics.UpdateAPIView):
    queryset = Carros.objects.all()
    serializer_class = CarrosSerializer


    def perform_update(self, serializer):
        nova_foto = self.request.data.get('nova_foto', None)

        if nova_foto:
            serializer.save(foto=nova_foto)
        else:
            serializer.save()