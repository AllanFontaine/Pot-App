from django.conf.urls import url
from django.urls import path

from .views import PlantesAPIView, PlantesRudView, ParcelleRudView, ParcelleAPIView, UserAPIView, UserRudView, UserRegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    url(r'^$', PlantesAPIView.as_view(), name='post-listcreate-plant'),
    url(r'^(?P<pk>\d+)/$', PlantesRudView.as_view(), name='post-rud-plant'),
    url(r'^users/$', UserAPIView.as_view(), name='post-listcreate-util'),
    url(r'^categorie/(?P<pk>\d+)/$', UserRudView.as_view(), name='post-rud-util'),
    url(r'^parcelle/$', ParcelleAPIView.as_view(), name='post-listcreate-parce'),
    url(r'^parcelle/(?P<pk>\d+)/$', ParcelleRudView.as_view(), name='post-rud-parce'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', UserRegisterView.as_view())
    ]

app_name = 'plantes'
