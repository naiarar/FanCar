from django.db import models
from uuid import uuid4

def upload_imagem_carro(instance, filename):
    return f"{instance.id_carro}-{filename}"
class Carros(models.Model):
    id_carro = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    nome_carro =  models.CharField(max_length=30)
    marca = models.CharField(max_length=30)
    modelo = models.CharField(max_length=30)
    ano_fabricacao = models.IntegerField()
    ano_modelo = models.IntegerField()
    cor = models.CharField(max_length=30)
    tipo_combustivel = models.CharField(max_length=10)
    cambio = models.CharField(max_length=10)
    quilometragem = models.IntegerField()
    foto = models.ImageField(upload_to=upload_imagem_carro, blank=False, null=False)