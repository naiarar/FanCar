from django.urls import path
from .views import CarrosListCreate, CarrosRetrieveUpdateDelete

urlpatterns = [
    path('carros', CarrosListCreate.as_view(), name='Criar-Lista-Carros '),
    path('carros/<int:pk>/', CarrosRetrieveUpdateDelete.as_view(), name='carros-detalhes')
]
