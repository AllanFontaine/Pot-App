from django.conf.urls import url
from django.urls import path, include
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

urlpatterns = [
    path('', include(router.urls)),
    ]

app_name = 'plantes'
