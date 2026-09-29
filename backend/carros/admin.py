from django.contrib import admin

from .models import Carros


@admin.register(Carros)
class CarrosAdmin(admin.ModelAdmin):
    list_display = ['nome_carro', 'marca', 'modelo', 'ano_modelo', 'valor']
    list_filter = ['marca', 'tipo_combustivel', 'cambio']
    search_fields = ['nome_carro', 'marca', 'modelo']
