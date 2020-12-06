
from django.db.models import Q
from appli.models import Plantes
from rest_framework import generics, mixins, permissions, viewsets
from django.contrib.auth.models import User
from appli.models import Plantes, Parcelle, DonneesParcelle, DonneesUser, Profile
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView
from .filters import ParcellePlantesFilter
from .permissions import IsOwnerOrReadOnly
from .serializers import PlantesSerializer, ParcelleSerializer, UserSerializer, RegisterSerializer, ParcellePlanteSerializer, DonneesParcelleSerializer, DonneesUserSerializer, ProfileSerializer
from django.views.decorators.http import require_http_methods
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('reset-password:reset-password-confirm')),
            reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


def is_valid_queryparam(param):
    return param != '' and param is not None

class PlantesAPIView( viewsets.ModelViewSet):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = PlantesSerializer
    permission_classes = []
    model = Plantes
    http_method_names = ['get', 'post', 'delete']

    def get_queryset(self, *args, **kwargs):
        print(self.request.user)
        queryset_list = Plantes.objects.all()
        query_saison = self.request.GET.get("saison")
        query_semis_day = self.request.GET.get("day")
        query_semis_mois = self.request.GET.get("month")
        query_comp = self.request.GET.get("comp")
        query_name = self.request.GET.get("name")
        if is_valid_queryparam(query_name):
            queryset_list = queryset_list.filter(
                Q(nom__icontains=query_name)
            ).distinct()
        if is_valid_queryparam(query_comp):
            query_comp = query_comp.split("T")
            if(query_comp[0] == "h"):
                if(query_comp[1] == "a"):
                    queryset_list = queryset_list.filter(
                        azote_sol__gt=query_comp[2]
                    ).order_by('-azote_sol')
                if(query_comp[1] == "ph"):
                    queryset_list = queryset_list.filter(
                        Q(phosphore_sol__gt=query_comp[2])
                    ).order_by('-phosphore_sol')    
                if(query_comp[1] == "po"):
                    queryset_list = queryset_list.filter(
                        Q(potassium_sol__gt=query_comp[2])
                    ).order_by('-potassium_sol')
            if(query_comp[0] == "l"):
                if(query_comp[1] == "a"):
                    queryset_list = queryset_list.filter(
                        Q(azote_sol__lt=query_comp[2])
                    ).order_by('azote_sol')
                if(query_comp[1] == "ph"):
                    queryset_list = queryset_list.filter(
                        Q(phosphore_sol__lt=query_comp[2])
                    ).order_by('phosphore_sol')
                if(query_comp[1] == "po"):
                    queryset_list = queryset_list.filter(
                        Q(potassium_sol__lt=query_comp[2])
                    ).order_by('potassium_sol')
        if is_valid_queryparam(query_saison):
            queryset_list = queryset_list.filter(
                Q(date_semis_debut=query_saison)
            ).distinct()
        if is_valid_queryparam(query_semis_mois) & is_valid_queryparam(query_semis_day):
            queryset_list = queryset_list.filter(
                Q(date_semis_debut__month__lte=query_semis_mois) &
                Q(date_semis_debut__day__lte=query_semis_day) &
                Q(date_semis_fin__month__gte=query_semis_mois) &
                Q(date_semis_fin__day__gte=query_semis_day) 
            ).distinct()
        return queryset_list


class UserAPIView(viewsets.ModelViewSet, ListAPIView):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = UserSerializer
    permission_classes = []
    http_method_names = ['get', 'post', 'delete', 'put']

    def get_queryset(self, *args, **kwargs):
        queryset_list = User.objects.filter(id=self.request.user.id)
        return queryset_list

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}

class ProfileAPIView(viewsets.ModelViewSet):  # detailview
    lookup_field = 'user'  # (?P<pk>\d+) pk = id
    serializer_class = ProfileSerializer
    permission_classes = []
    http_method_names = ['get', 'post', 'delete','put']
    
    def get_queryset(self, *args, **kwargs):
        queryset_list = Profile.objects.filter(user=self.request.user.id)
        return queryset_list


class UserRegisterView(generics.CreateAPIView):
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
    http_method_names = ['get', 'post', 'delete', 'put']

    def get_queryset(self, *args, **kwargs):
        queryset_list = Parcelle.objects.filter(userId=self.request.user.id).order_by('-date_plantation')
        return queryset_list

    def post(self, request, *args, **kwargs):
        print(self.userId)
        print(request.user)
        return self.create(request, *args, **kwargs)



#Obtenir un detail des parcelle et des plantes : GET

class ParcellePlantesAPIView(viewsets.ModelViewSet):  # detailview
    """
    Requete permettant de récupérer les parcelles mais aussi les plantes qu'elle contiennent



    """
    http_method_names = ['get']
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = ParcellePlanteSerializer
    permission_classes = []
    http_method_names = ['get', 'post', 'delete']

    
    def get_queryset(self, *args, **kwargs):
<<<<<<< HEAD
        queryset_list = Parcelle.objects.filter(userId=self.request.user.id)
        query_status = self.request.GET.get("stat")
        query_ordernumParcel = self.request.GET.get("order_numparcel")
=======
        """
     
        """
        queryset_list = Parcelle.objects.all()
        query_status = self.request.GET.get("stat")
        query_user = self.request.GET.get("userid")
>>>>>>> finition_celia
        query_numParcel = self.request.GET.get("numparcel")
        query_date = self.request.GET.get("date")
        query_ordernumParcel = self.request.GET.get("order_numparcel")
        query_namePlant = self.request.GET.get("order_nameplant")
        query_dateOrder = self.request.GET.get('order_date')
        query_orderStatus = self.request.GET.get('order_stat')
        query_scientificName = self.request.GET.get('order_scientname')
        if is_valid_queryparam(query_status):
            queryset_list = queryset_list.filter(
                Q(estUtilise=query_status)
            ).distinct().order_by('date_plantation')
        if is_valid_queryparam(query_numParcel):
            queryset_list = queryset_list.filter(
                Q(numero_parcelle=query_numParcel) &
                Q(estUtilise=False) 
            ).order_by('-date_plantation').distinct()
        if is_valid_queryparam(query_numParcel) & is_valid_queryparam(query_date) :
            queryset_list = queryset_list.filter(
                Q(numero_parcelle=query_numParcel) &
                Q(estUtilise=False) &
                Q(date_plantation__lte=query_date)
            ).order_by('-date_plantation').distinct()
        if is_valid_queryparam(query_ordernumParcel):
            if (query_ordernumParcel == 'ASC'):
                queryset_list = queryset_list.order_by('-numero_parcelle')
            if (query_ordernumParcel =='DSC'):
                queryset_list = queryset_list.order_by('numero_parcelle')

        if is_valid_queryparam(query_namePlant):
            if (query_namePlant == 'ASC'):
                queryset_list = queryset_list.order_by('-planteId__nom')
            if (query_namePlant =='DSC'):
                queryset_list = queryset_list.order_by('planteId__nom')

        if is_valid_queryparam(query_dateOrder):
            if (query_dateOrder == 'ASC'):
                queryset_list = queryset_list.order_by('-date_plantation')
            if (query_dateOrder =='DSC'):
                queryset_list = queryset_list.order_by('date_plantation')

        if is_valid_queryparam(query_orderStatus):
            if (query_orderStatus == 'ASC'):
                queryset_list = queryset_list.order_by('-estUtilise')
            if (query_orderStatus =='DSC'):
                queryset_list = queryset_list.order_by('estUtilise')

        if is_valid_queryparam(query_scientificName):
            if (query_scientificName == 'ASC'):
                queryset_list = queryset_list.order_by('-planteId__nom_scientifique')
            if (query_scientificName =='DSC'):
                queryset_list = queryset_list.order_by('planteId__nom_scientifique')
        return queryset_list

        

######## Données reprises de la sonde et attribuées par parcelle ####################################################


class DonneesParcelleAPIView(viewsets.ModelViewSet):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = DonneesParcelleSerializer
    permission_classes = []
    http_method_names = ['get', 'post']

    def get_queryset(self, *args, **kwargs):
        queryset_list = DonneesParcelle.objects.all()
        query_date = self.request.GET.get("date")
        if is_valid_queryparam(query_date):
             queryset_list = queryset_list.filter(
                Q(date_reception_donnee__gte=query_date)
            ).distinct().order_by('date_reception_donnee')

        query_idParcelle = self.request.GET.get("idParcelle")
        if is_valid_queryparam(query_idParcelle):
             queryset_list = queryset_list.filter(
                Q(parcelleId = query_idParcelle)
            ).distinct()
        return queryset_list




### Données reprises de la sonde et attribuées par user ###########################################################

class DonneesUserAPIView(viewsets.ModelViewSet):  # detailview
    lookup_field = 'pk'  # (?P<pk>\d+) pk = id
    serializer_class = DonneesUserSerializer
    permission_classes = []
    http_method_names = ['get', 'post']

    def get_queryset(self, *args, **kwargs):
        queryset_list = DonneesUser.objects.filter(userId=self.request.user.id)
        query_date = self.request.GET.get("date")
        if is_valid_queryparam(query_date):
            queryset_list = queryset_list.filter(
                Q(date_reception_donnee__gte=query_date)
            ).distinct().order_by('date_reception_donnee')
        return queryset_list
