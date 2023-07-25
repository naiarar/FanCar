from rest_framework import viewsets
from carros import serializers
from carros import models
from rest_framework.filters import OrderingFilter


class CarrosViewset(viewsets.ModelViewSet):
    serializer_class = serializers.CarrosSerializer
    queryset = models.Carros.objects.all()
    filter_backends = [OrderingFilter]
    ordering_fields = ['valor']