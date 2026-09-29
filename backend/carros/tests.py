import shutil
import tempfile
from pathlib import Path
from io import BytesIO

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Carros

MEDIA_TESTE = tempfile.mkdtemp()


def dados_carro(**extra):
    dados = {
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
    }
    dados.update(extra)
    return dados


def imagem_png():
    buffer = BytesIO()
    Image.new('RGB', (10, 10)).save(buffer, format='PNG')
    return SimpleUploadedFile('carro.png', buffer.getvalue(), content_type='image/png')


@override_settings(MEDIA_ROOT=MEDIA_TESTE)
class CarrosApiTests(APITestCase):
    url = '/api/carros/'

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(MEDIA_TESTE, ignore_errors=True)

    def setUp(self):
        self.usuario = get_user_model().objects.create_user('admin', password='senha-forte-123')
        self.barato = Carros.objects.create(**dados_carro(nome_carro='Renegade', valor=89900))
        self.caro = Carros.objects.create(**dados_carro(nome_carro='X1', marca='BMW', valor=159900))

    def autenticar(self):
        resposta = self.client.post(
            '/api/token/', {'username': 'admin', 'password': 'senha-forte-123'}, format='json'
        )
        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {resposta.data['access']}")

    def test_listagem_publica_ordenada_por_valor(self):
        resposta = self.client.get(self.url, {'ordering': '-valor'})

        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.assertEqual([c['nome_carro'] for c in resposta.data], ['X1', 'Renegade'])

    def test_busca_por_marca(self):
        resposta = self.client.get(self.url, {'search': 'bmw'})

        self.assertEqual([c['nome_carro'] for c in resposta.data], ['X1'])

    def test_detalhe_publico(self):
        resposta = self.client.get(f'{self.url}{self.barato.id_carro}/')

        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.assertEqual(resposta.data['nome_carro'], 'Renegade')

    def test_escrita_exige_autenticacao(self):
        detalhe = f'{self.url}{self.barato.id_carro}/'

        self.assertEqual(self.client.post(self.url, dados_carro()).status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(self.client.patch(detalhe, {'valor': 1}).status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(self.client.delete(detalhe).status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Carros.objects.count(), 2)

    def test_cadastro_com_foto(self):
        self.autenticar()

        resposta = self.client.post(
            self.url, dados_carro(tipo_combustivel='gas-natural', foto=imagem_png()), format='multipart'
        )

        self.assertEqual(resposta.status_code, status.HTTP_201_CREATED, resposta.data)
        self.assertIn('/media/', resposta.data['foto'])

    def test_cadastro_sem_foto(self):
        self.autenticar()

        resposta = self.client.post(self.url, dados_carro(), format='multipart')

        self.assertEqual(resposta.status_code, status.HTTP_201_CREATED, resposta.data)
        self.assertIsNone(resposta.data['foto'])

    def test_ano_modelo_invalido(self):
        self.autenticar()

        resposta = self.client.post(self.url, dados_carro(ano_fabricacao=2020, ano_modelo=2018))

        self.assertEqual(resposta.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('ano_modelo', resposta.data)

    def test_edicao_parcial(self):
        self.autenticar()

        resposta = self.client.patch(f'{self.url}{self.barato.id_carro}/', {'valor': 85000})

        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.barato.refresh_from_db()
        self.assertEqual(self.barato.valor, 85000)

    def test_exclusao(self):
        self.autenticar()

        resposta = self.client.delete(f'{self.url}{self.caro.id_carro}/')

        self.assertEqual(resposta.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Carros.objects.filter(pk=self.caro.pk).exists())

    def test_exclusao_remove_foto(self):
        self.autenticar()
        resposta = self.client.post(self.url, dados_carro(foto=imagem_png()), format='multipart')
        arquivo = Path(MEDIA_TESTE) / Carros.objects.get(pk=resposta.data['id_carro']).foto.name

        self.client.delete(f"{self.url}{resposta.data['id_carro']}/")

        self.assertFalse(arquivo.exists())

    def test_troca_de_foto_remove_a_anterior(self):
        self.autenticar()
        resposta = self.client.post(self.url, dados_carro(foto=imagem_png()), format='multipart')
        carro = Carros.objects.get(pk=resposta.data['id_carro'])
        antiga = Path(MEDIA_TESTE) / carro.foto.name

        self.client.patch(f'{self.url}{carro.pk}/', {'foto': imagem_png()}, format='multipart')

        self.assertFalse(antiga.exists())
        carro.refresh_from_db()
        self.assertTrue((Path(MEDIA_TESTE) / carro.foto.name).exists())
