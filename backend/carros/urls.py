from django.urls import path
from .views import CarrosListCreate, CarrosRetrieveUpdateDelete, CarrosUpdateView

urlpatterns = [
    path('carros', CarrosListCreate.as_view(), name='Criar-Lista-Carros '),
    path('carros/<int:pk>/', CarrosRetrieveUpdateDelete.as_view(), name='carros-detalhes'),
    path('carros/<int:pk>/update/', CarrosUpdateView.as_view(), name='carros-update'),
]
