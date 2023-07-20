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