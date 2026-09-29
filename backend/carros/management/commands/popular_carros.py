from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from carros.models import Carros

PASTA_IMAGENS = Path(settings.BASE_DIR).parent / 'frontend' / 'src' / 'assets' / 'img'

CARROS = [
    {
        'nome_carro': 'X1',
        'marca': 'BMW',
        'modelo': 'sDrive20i',
        'ano_fabricacao': 2018,
        'ano_modelo': 2019,
        'cor': 'Preto',
        'tipo_combustivel': 'gasolina',
        'cambio': 'automatico',
        'quilometragem': 52000,
        'valor': 159900,
        'imagem': 'x1-2016-2019-suv.png',
    },
    {
        'nome_carro': 'Compass',
        'marca': 'Jeep',
        'modelo': 'Longitude',
        'ano_fabricacao': 2021,
        'ano_modelo': 2022,
        'cor': 'Cinza',
        'tipo_combustivel': 'flex',
        'cambio': 'automatico',
        'quilometragem': 34000,
        'valor': 149900,
        'imagem': 'compass-2018-2022-suv.png',
    },
    {
        'nome_carro': 'Renegade',
        'marca': 'Jeep',
        'modelo': 'Sport',
        'ano_fabricacao': 2020,
        'ano_modelo': 2020,
        'cor': 'Vermelho',
        'tipo_combustivel': 'flex',
        'cambio': 'manual',
        'quilometragem': 61000,
        'valor': 89900,
        'imagem': 'renegade-2017-2022-suv.png',
    },
]


class Command(BaseCommand):
    help = 'Cadastra veículos de exemplo no catálogo.'

    def handle(self, *args, **options):
        criados = 0
        for dados in CARROS:
            dados = dict(dados)
            imagem = dados.pop('imagem')
            carro, criado = Carros.objects.get_or_create(
                nome_carro=dados['nome_carro'],
                marca=dados['marca'],
                defaults=dados,
            )
            if not criado:
                continue
            caminho = PASTA_IMAGENS / imagem
            if caminho.exists():
                with caminho.open('rb') as arquivo:
                    carro.foto.save(imagem, File(arquivo))
            criados += 1
        self.stdout.write(self.style.SUCCESS(f'{criados} veículo(s) cadastrado(s).'))
