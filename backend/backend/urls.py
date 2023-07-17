from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import routers
from carros.api import viewsets as carrosviewset
from django.conf.urls.static import static
from django.conf import settings


route = routers.DefaultRouter()
route.register(r'carros', carrosviewset.CarrosViewset, basename= "Carros") 


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(route.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

