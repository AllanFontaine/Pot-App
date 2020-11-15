from django.db.models import Q
from appli.models import Plantes
from rest_framework import generics, mixins, permissions, viewsets
from django.contrib.auth.models import User
from appli.models import Plantes, Parcelle, DonneesParcelle, DonneesUser, Profile
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView
from .permissions import IsOwnerOrReadOnly
from .serializers import PlantesSerializer, ParcelleSerializer, UserSerializer, RegisterSerializer, ParcellePlanteSerializer, DonneesParcelleSerializer, DonneesUserSerializer, ProfileSerializer

def is_valid_queryparam(param):
    return param != '' and param is not None


class PlantesAPIView(ListAPIView, viewsets.ModelViewSet):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = PlantesSerializer
    permission_classes = []
    model = Plantes

    def get_queryset(self, *args, **kwargs):
        queryset_list = Plantes.objects.all()
        query_saison = self.request.GET.get("saison")
        query_name = self.request.GET.get("name")
        if is_valid_queryparam(query_name):
            queryset_list = queryset_list.filter(
                Q(nom__icontains=query_name)
            ).distinct()
        if is_valid_queryparam(query_saison):
            queryset_list = queryset_list.filter(
                Q(date_semis_debut=query_saison)
            ).distinct()
        return queryset_list


class UserAPIView(viewsets.ModelViewSet, ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = UserSerializer
    permission_classes = []
    queryset = User.objects.all()

    def perform_create(self, serializer):
            serializer.save()  # Ceci servirait pour ce qui est dans read_only_fields

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}

class ProfileAPIView(viewsets.ModelViewSet):  # detailview
    lookup_field = 'user'  # (?P<pk>\d+) pk = id
    serializer_class = ProfileSerializer
    permission_classes = []
    queryset = Profile.objects.all()


class UserRegisterView(generics.ListCreateAPIView):
    model = User
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    permission_classes = []


#### Données du model parcelle ##########################################################################################

# Moins de détails dans les parcelles pour faciliter un post: POST

class ParcelleAPIView(viewsets.ModelViewSet, generics.UpdateAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcelleSerializer
    permission_classes = []
    queryset = Parcelle.objects.all().order_by('-date_plantation')

#Obtenir un detail des parcelle et des plantes : GET


class ParcellePlantesAPIView(viewsets.ModelViewSet):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcellePlanteSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = Parcelle.objects.all()
        query_status = self.request.GET.get("stat")
        query_user = self.request.GET.get("userid")
        if is_valid_queryparam(query_status):
            queryset_list = queryset_list.filter(
                Q(estUtilise=query_status)
            ).distinct()
        if is_valid_queryparam(query_user):
            queryset_list = queryset_list.filter(
                Q(userId=query_user)
            ).distinct()
        return queryset_list.order_by('-date_plantation')

######## Données reprises de la sonde et attribuées par parcelle ####################################################


class DonneesParcelleAPIView(viewsets.ModelViewSet):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = DonneesParcelleSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = DonneesUser.objects.all()
        query_date = self.request.GET.get("date")
        if is_valid_queryparam(query_date):
            queryset_list = queryset_list.filter(
                Q(date_reception_donnee__gte=query_date)
            ).distinct().order_by('-date_reception_donnee')
        return queryset_list




### Données reprises de la sonde et attribuées par user ###########################################################

class DonneesUserAPIView(viewsets.ModelViewSet):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = DonneesUserSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = DonneesUser.objects.all()
        query_date = self.request.GET.get("date")
        if is_valid_queryparam(query_date):
            queryset_list = queryset_list.filter(
                Q(date_reception_donnee__gte=query_date)
            ).distinct().order_by('-date_reception_donnee')
        return queryset_list



