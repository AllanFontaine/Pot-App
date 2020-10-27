from django.db.models import Q
from rest_framework import generics, mixins, permissions
from django.contrib.auth.models import User
from appli.models import Plantes, Parcelle
from .permissions import IsOwnerOrReadOnly
from .serializers import PlantesSerializer, ParcelleSerializer, UserSerializer, RegisterSerializer


class PlantesAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = PlantesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qss = Plantes.objects.all()
        query = self.request.GET.get("q")
        if query is not None:
            qss = qss.filter(
                Q(titre__icontains=query) |
                Q(contenu__icontains=query)
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


class PlantesRudView(generics.RetrieveUpdateDestroyAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = PlantesSerializer
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qss = Plantes.objects.all()
        query = self.request.GET.get("q")
        if query is not None:
            qss = qss.filter(
                Q(titre__icontains=query) |
                Q(contenu__icontains=query)
            ).distinct()
        return qss

    def perform_create(self, serializer):
        serializer.save()  # Ceci servirait pour ce qui est dans read_only_fields

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}


class UserRudView(generics.RetrieveUpdateDestroyAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Plantes.objects.all()

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}



class UserRegisterView(generics.ListCreateAPIView):
    model = User
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    permission_classes = []



class ParcelleAPIView(mixins.CreateModelMixin, generics.ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcelleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qss = Parcelle.objects.all()
        query = self.request.GET.get("q")
        if query is not None:
            qss = qss.filter(
                Q(titre__icontains=query) |
                Q(contenu__icontains=query)
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


class ParcelleRudView(generics.RetrieveUpdateDestroyAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcelleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Parcelle.objects.all()

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}

    # def get_object(self):
    #   pk = self.kwargs.get("pk")
    #  return News.objects.get(pk=pk)

