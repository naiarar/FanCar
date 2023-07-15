from django.contrib import admin
from django.urls import path, include
from .views import CustomTokenObtainPairView, CustomTokenRefreshView
from rest_framework import routers
from carros.api import viewsets as carrosviewset


route = routers.DefaultRouter()
route.register(r'carros', carrosviewset.CarrosViewset, basename= "Carros") 


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view()),
    path('api/token/refresh/', CustomTokenRefreshView.as_view())
]

