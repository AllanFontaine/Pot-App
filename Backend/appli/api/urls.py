from django.conf.urls import url, include
from django.urls import path, include
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import routers
from .serializers import CustomJWTSerializer
from appli.api import views
from .views import PlantesAPIView, ParcelleAPIView, UserRegisterView, UserAPIView, DonneesParcelleAPIView, DonneesUserAPIView, ParcellePlantesAPIView, ProfileAPIView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


app_name = "Pot_App"

schema_view = get_schema_view(
   openapi.Info(
      title="Pot'App API",
      default_version='v1',
      description= "La documentation Swagger de notre API Pot'App, ici vous pourrez trouver toutes les requètes disponible sur notre API REST et qui sont utilisées par notre site web: www.potapp.be \n \n" +
                    "Cette API a été développée à l'aide de Django REST Framework \n \n" +
                    "Certaines des requètes ci-dessous sont bloquées et ne peuvent que être appelées grace à un Bearer Token, pour avoir accès à celle-ci il faut être connecté à un compte existant. \n" +
                    "Vous pourrez retrouver ci dessous la légende d'écriture de notre API: \n \n" +
                    "*** = Requète nécessitant un Token pour accéder \n" +
                    "+++ = Requète ouverte à tout utilisateur de l'api",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="potapp@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

router = routers.DefaultRouter()
router.register(r'plante', views.PlantesAPIView, basename="plantes")
router.register(r'users', views.UserAPIView, basename="users")
router.register(r'parcelle', views.ParcelleAPIView, basename="parcelles")
router.register(r'parcelle-plantes', views.ParcellePlantesAPIView, basename="parcellePlantes")
router.register(r'donnees-parcelle', views.DonneesParcelleAPIView, basename="dParcelles")
router.register(r'donnees-user', views.DonneesUserAPIView, basename="dUsers")
router.register(r'profile', views.ProfileAPIView, basename= "dProfile")




urlpatterns = [
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^password_reset/', include(('django_rest_passwordreset.urls', 'reset-password'), namespace = 'reset-password')),

    path('token', jwt_views.TokenObtainPairView.as_view(serializer_class=CustomJWTSerializer), name='token_obtain_pair'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register', UserRegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]
    

app_name = 'plantes'

