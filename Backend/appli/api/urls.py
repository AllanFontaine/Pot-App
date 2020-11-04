from django.conf.urls import url
from django.urls import path
from rest_framework import routers
from .serializers import CustomJWTSerializer
from .views import PlantesAPIView, PlantesRudView, ParcelleRudView, ParcelleAPIView, UserAPIView, UserRudView, UserRegisterView, UserDetail, DonneesParcelleAPIView, DonneesUserAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
"""
router = routers.DefaultRouter()
router.register(r'plante', PlantesAPIView.as_view(), basename='post-listcreate-plant')
router.register(r'plante/(?P<pk>\d+)/', PlantesRudView.as_view(), basename='post-rud-plant')

router.register(r'users', UserAPIView.as_view(), basename='post-listcreate-user')
router.register(r'users/(?P<pk>\d+)/', UserRudView.as_view(), basename='post-rud-user')

router.register(r'parcelle', ParcelleAPIView.as_view(), basename='post-listcreate-parce')
router.register(r'^parcelle/(?P<pk>\d+)/', ParcelleRudView.as_view(), basename='post-rud-parce')
router.register(r'parcelle-user/(?P<pk>\d+)/', UserDetail.as_view())
router.register(r'^donnees-parcelle', DonneesParcelleAPIView.as_view(), basename='post-listcreate-dParce')
router.register(r'^donnees-user', DonneesUserAPIView.as_view(), basename='post-listcreate-dUser')"""

urlpatterns = [
    #path('', include(router.urls)),
    url(r'^plante/$', PlantesAPIView.as_view(), name='post-listcreate-plant'),
    url(r'^plante/(?P<pk>\d+)/$', PlantesRudView.as_view(), name='post-rud-plant'),
    url(r'^users$', UserAPIView.as_view(), name='post-listcreate-user'),
    url(r'^users/(?P<pk>\d+)/$', UserRudView.as_view(), name='post-rud-user'),

    url(r'^parcelle/$', ParcelleAPIView.as_view(), name='post-listcreate-parce'),
    url(r'^parcelle/(?P<pk>\d+)/$', ParcelleRudView.as_view(), name='post-rud-parce'),

    url(r'^parcelle-user/(?P<pk>\d+)/$', UserDetail.as_view()),
    url(r'^donnees-parcelle/$', DonneesParcelleAPIView.as_view(), name='post-listcreate-dParce'),
    url(r'^donnees-user/$', DonneesUserAPIView.as_view(), name='post-listcreate-dUser'),

    path('token', TokenObtainPairView.as_view(serializer_class=CustomJWTSerializer), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', UserRegisterView.as_view()),

    ]

app_name = 'plantes'
