from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# View para obter os tokens JWT
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = "abc"

# View para atualizar os tokens JWT
class CustomTokenRefreshView(TokenRefreshView):
    pass

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    # O usuário está autenticado e pode acessar esta view
    # A lógica do view vai aqui
    print("hello")