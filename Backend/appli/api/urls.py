from django.conf.urls import url
from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import routers
from .serializers import CustomJWTSerializer
from appli.api import views
from .views import PlantesAPIView, ParcelleAPIView, UserAPIView, UserRegisterView, UserDetail, DonneesParcelleAPIView, DonneesUserAPIView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'plante', views.PlantesAPIView, basename="plantes")
router.register(r'users', views.UserAPIView, basename="users")
router.register(r'parcelle', views.ParcelleAPIView, basename="parcelles")
router.register(r'parcelle-user', views.UserDetail, basename="parcellesUsers")
router.register(r'donnees-parcelle', views.DonneesParcelleAPIView, basename="dParcelles")
router.register(r'donnees-user', views.DonneesUserAPIView, basename="dUsers")

schema_view = get_schema_view(
   openapi.Info(
      title="PotApp API",
      default_version='v1',
      description="PotApp API v1",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    url(r'^$', PlantesAPIView.as_view(), name='post-listcreate-plant'),
    url(r'^(?P<pk>\d+)/$', PlantesRudView.as_view(), name='post-rud-plant'),
    url(r'^users/$', UserAPIView.as_view(), name='post-listcreate-util'),
    url(r'^categorie/(?P<pk>\d+)/$', UserRudView.as_view(), name='post-rud-util'),
    url(r'^parcelle/$', ParcelleAPIView.as_view(), name='post-listcreate-parce'),
    url(r'^parcelle/(?P<pk>\d+)/$', ParcelleRudView.as_view(), name='post-rud-parce'),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', UserRegisterView.as_view()),
    path('', include(router.urls)),
]
    

app_name = 'plantes'
