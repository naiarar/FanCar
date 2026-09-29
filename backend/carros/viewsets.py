from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from carros.models import Carros
from carros.serializers import CarrosSerializer


class CarrosViewset(viewsets.ModelViewSet):
    serializer_class = CarrosSerializer
    queryset = Carros.objects.all()
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nome_carro', 'marca', 'modelo']
    ordering_fields = ['valor', 'ano_modelo', 'quilometragem']

    def perform_update(self, serializer):
        foto_antiga = serializer.instance.foto
        carro = serializer.save()
        if foto_antiga and foto_antiga.name != carro.foto.name:
            foto_antiga.delete(save=False)

    def perform_destroy(self, instance):
        if instance.foto:
            instance.foto.delete(save=False)
        instance.delete()
