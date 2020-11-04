from django.db.models import Q
from rest_framework import generics, mixins, permissions, viewsets
from django.contrib.auth.models import User
from appli.models import Plantes, Parcelle, DonneesParcelle, DonneesUser
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView
from .permissions import IsOwnerOrReadOnly
from .serializers import PlantesSerializer, ParcelleSerializer, UserSerializer, RegisterSerializer, UserParcelleSerializer, ParcellePlanteSerializer, DonneesParcelleSerializer, DonneesUserSerializer


def is_valid_queryparam(param):
    return param != '' and param is not None

class PlantesAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = PlantesSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = Plantes.objects.all()
        query_id = self.request.GET.get("id")
        if is_valid_queryparam(query_id):
            queryset_list = queryset_list.filter(
                Q(id=query_id)
            ).distinct()
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()  # Ceci servirait pour ce qui est dans read_only_fields

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}


class UserAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = UserSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = User.objects.all()
        query_id = self.request.GET.get("id")
        if is_valid_queryparam(query_id):
            queryset_list = queryset_list.filter(
                Q(id=query_id)
            ).distinct()
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()  # Ceci servirait pour ce qui est dans read_only_fields


    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}



class UserRegisterView(CreateAPIView):
    model = get_user_model()
    permission_classes = []
    serializer_class = RegisterSerializer


class UserDetail(ListAPIView):
    permission_classes = []
    lookup_field = 'pk'
    serializer_class = UserParcelleSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = User.objects.all()
        query_id = self.request.GET.get("id")
        if is_valid_queryparam(query_id):
            queryset_list = queryset_list.filter(
                Q(id=query_id)
            ).distinct()
        return queryset_list


#### Données du model parcelle ##########################################################################################


class ParcelleAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcelleSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = Parcelle.objects.all()
        query_status = self.request.GET.get("stat")
        query_id = self.request.GET.get("id")
        if is_valid_queryparam(query_status):
            queryset_list = queryset_list.filter(
                Q(estUtilise=query_status)
            ).distinct()
        if is_valid_queryparam(query_id):
            queryset_list = queryset_list.filter(
                Q(id=query_id)
            ).distinct()
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()  # Ceci servirait pour ce qui est dans read_only_fields

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}


######## Données reprises de la sonde et attribuées par parcelle ####################################################


class DonneesParcelleAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = DonneesParcelleSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = DonneesUser.objects.all()
        query_date = self.request.GET.get("date")
        query_parcelle = self.request.GET.get("id")
        if is_valid_queryparam(query_date):
            queryset_list = queryset_list.filter(
                Q(date_reception_donnee__gte=query_date)
            ).distinct().order_by('-date_reception_donnee')
        if is_valid_queryparam(query_user):
            queryset_list = queryset_list.filter(
                Q(userId_id=query_parcelle)
            ).distinct().order_by('-date_reception_donnee')
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()  # Ceci servirait pour ce qui est dans read_only_fields

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}



### Données reprises de la sonde et attribuées par user ###########################################################

class DonneesUserAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = DonneesUserSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        queryset_list = DonneesUser.objects.all()
        query_date = self.request.GET.get("date")
        query_user = self.request.GET.get("id")
        if is_valid_queryparam(query_date):
            queryset_list = queryset_list.filter(
                Q(date_reception_donnee__gte=query_date)
            ).distinct().order_by('-date_reception_donnee')
        if is_valid_queryparam(query_user):
            queryset_list = queryset_list.filter(
                Q(userId_id=query_user)
            ).distinct().order_by('-date_reception_donnee')
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()  # Ceci servirait pour ce qui est dans read_only_fields

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}
