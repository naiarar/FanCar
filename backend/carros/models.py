from uuid import uuid4

from django.db import models


def upload_imagem_carro(instance, filename):
    return f"{instance.id_carro}-{filename}"


class Carros(models.Model):
    class Combustivel(models.TextChoices):
        GASOLINA = 'gasolina', 'Gasolina'
        ALCOOL = 'alcool', 'Álcool'
        FLEX = 'flex', 'Flex'
        DIESEL = 'diesel', 'Diesel'
        GAS_NATURAL = 'gas-natural', 'Gás Natural'
        ELETRICO = 'eletrico', 'Elétrico'
        HIBRIDO = 'hibrido', 'Híbrido'

    class Cambio(models.TextChoices):
        MANUAL = 'manual', 'Manual'
        AUTOMATICO = 'automatico', 'Automático'

    id_carro = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    nome_carro = models.CharField(max_length=30)
    marca = models.CharField(max_length=30)
    modelo = models.CharField(max_length=30)
    ano_fabricacao = models.PositiveIntegerField()
    ano_modelo = models.PositiveIntegerField()
    cor = models.CharField(max_length=30)
    tipo_combustivel = models.CharField(max_length=20, choices=Combustivel.choices)
    cambio = models.CharField(max_length=10, choices=Cambio.choices)
    quilometragem = models.PositiveIntegerField()
    valor = models.PositiveIntegerField()
    foto = models.ImageField(upload_to=upload_imagem_carro, null=True, blank=True)

    class Meta:
        ordering = ['valor']
        verbose_name = 'carro'
        verbose_name_plural = 'carros'

    def __str__(self):
        return f"{self.marca} {self.nome_carro} {self.ano_modelo}"
