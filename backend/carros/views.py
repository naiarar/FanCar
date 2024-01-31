from django.shortcuts import render
from rest_framework import generics
from .models import Carros
from serializers import CarrosSerializer, CarrosSerializerUpdate
class CarrosListCreate(generics.ListCreateAPIView):
    queryset = Carros.objects.all()
    serializer_class = CarrosSerializer

class CarrosRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Carros.objects.all()
    serializer_class = CarrosSerializer

    def patch(self, request, *args, **kwargs):
        carros_serializer_update = CarrosSerializerUpdate(
            instance=request.carros,
            data=request.data,
            partial=True
        )
        if carros_serializer_update.is_valid():
            carros_serializer_update.save()
            