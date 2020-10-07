from django.conf.urls import url

from .views import PlantesAPIView, PlantesRudView, UtilisateursAPIView, UtilisateursRudView, ParcelleRudView, ParcelleAPIView

urlpatterns = [
    url(r'^$', PlantesAPIView.as_view(), name='post-listcreate-plant'),
    url(r'^(?P<pk>\d+)/$', PlantesRudView.as_view(), name='post-rud-plant'),
    url(r'^categorie/$', UtilisateursAPIView.as_view(), name='post-listcreate-util'),
    url(r'^categorie/(?P<pk>\d+)/$', UtilisateursRudView.as_view(), name='post-rud-util'),
    url(r'^parcelle/$', ParcelleAPIView.as_view(), name='post-listcreate-parce'),
    url(r'^parcelle/(?P<pk>\d+)/$', ParcelleRudView.as_view(), name='post-rud-parce'),
    ]

app_name = 'plantes'
