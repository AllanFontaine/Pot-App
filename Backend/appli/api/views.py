from django.db.models import Q
from rest_framework import generics, mixins, permissions
from django.contrib.auth.models import User
from appli.models import Plantes, Parcelle, DonneesParcelle, DonneesUser
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView
from .permissions import IsOwnerOrReadOnly
from .serializers import PlantesSerializer, ParcelleSerializer, UserSerializer, RegisterSerializer, UserParcelleSerializer, ParcellePlanteSerializer, DonneesParcelleSerializer, DonneesUserSerializer


class PlantesAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = PlantesSerializer
    permission_classes = []
    queryset = Plantes.objects.all()

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


class PlantesRudView(generics.RetrieveUpdateDestroyAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = PlantesSerializer
    permission_classes = []

    def get_queryset(self):
        return Plantes.objects.all()

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}

    # def get_object(self):
    #   pk = self.kwargs.get("pk")
    #  return News.objects.get(pk=pk)


class UserAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = UserSerializer
    permission_classes = []
    queryset = User.objects.all()

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


class UserRudView(generics.RetrieveUpdateDestroyAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = UserSerializer
    permission_classes = []

    def get_queryset(self):
        return User.objects.all()

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}



class UserRegisterView(CreateAPIView):
    model = get_user_model()
    permission_classes = []
    serializer_class = RegisterSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = []
    lookup_field = 'pk'
    serializer_class = UserParcelleSerializer
    queryset = User.objects.all()


#### Données du model parcelle ##########################################################################################


class ParcelleAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcelleSerializer
    permission_classes = []
    queryset = Parcelle.objects.all()

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


class ParcelleRudView(generics.RetrieveUpdateDestroyAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcellePlanteSerializer
    permission_classes = []

    def get_queryset(self):
        return Parcelle.objects.all()

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}

    # def get_object(self):
    #   pk = self.kwargs.get("pk")
    #  return News.objects.get(pk=pk)
    # permissions.IsAuthenticated



######## Données reprises de la sonde et attribuées par parcelle ####################################################

def is_valid_queryparam(param):
    return param != '' and param is not None

class DonneesParcelleAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = DonneesParcelleSerializer
    permission_classes = []

    def get_queryset(self):
        qss = DonneesParcelle.objects.all()
        query = self.request.GET.get("q")
        if query is not None:
            qss = qss.filter(
                Q(userId_id=query)
            ).distinct()
        return qss

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
        query = self.request.GET.get("q")
        if is_valid_queryparam(query):
            queryset_list = queryset_list.filter(
                Q(date_reception_donnee__gte=query)
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
