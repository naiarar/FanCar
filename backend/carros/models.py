from django.db import models
from uuid import uuid4

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
    foto = models.ImageField(upload_to='images/')