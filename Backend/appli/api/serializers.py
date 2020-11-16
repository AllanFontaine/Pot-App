from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from appli.models import Plantes, Parcelle, DonneesParcelle, DonneesUser, Profile
from django.contrib.auth.hashers import make_password
from django.core import exceptions
from django.db.models.functions import ExtractMonth
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import django.contrib.auth.password_validation as validators
from rest_framework_simplejwt.tokens import RefreshToken


UserModel = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class PlantesSerializer(serializers.ModelSerializer):
    saison_debut = serializers.SerializerMethodField()
    saison_fin = serializers.SerializerMethodField()

    def get_saison_debut(self, obj):
        month = obj.date_semis_fin.month
        if (month > 11 or month <= 3):
           return "WINTER"
        elif (month == 4 or month == 5):
           return "SPRING"
        elif (month >=6 and month <= 9):
           return "SUMMER"
        else:
            return "FALL"


    def get_saison_fin(self, obj):
        month = obj.date_semis_fin.month
        if (month > 11 or month <= 3):
           return "WINTER"
        elif (month == 4 or month == 5):
           return "SPRING"
        elif (month >=6 and month <= 9):
           return "SUMMER"
        else:
            return "FALL"



    class Meta:
        model = Plantes
        fields = [
            'id',
            'nom',
            'nom_scientifique',
            'besoin_hydrolique',
            'date_semis_debut',
            'date_semis_fin',
            'densite_semi',
            'saison_debut',
            'saison_fin',
            'recolte_en_jours',
            'description',
            'url_wiki',
            'image',
        ]
        read_only_fields = ['id']



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [ 'id', 'email', 'last_name', 'first_name', 'password', 'username' ]

    def validate_password (self, password):
        return make_password(password)



class ProfileSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Profile
        fields = ['id', 'user','nombre_parcelle','localisation']




class ParcelleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parcelle
        fields = [
            'id',
            'userId',
            'numero_parcelle',
            'date_plantation',
            'taille_metre_carre',
            'estUtilise',
            'planteId',
        ]
        read_only_fields = [
            'id']


class ParcellePlanteSerializer(serializers.ModelSerializer):
    planteId = PlantesSerializer(many=False, read_only=True)

    class Meta:
        model = Parcelle
        fields = [
            'id',
            'userId',
            'numero_parcelle',
            'taille_metre_carre',
            'estUtilise',
            'planteId',
        ]
        read_only_fields = [
            'id']



class CustomJWTSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        return token

    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get("password")
        }

        user_obj = User.objects.filter(email=attrs.get("username")).first() or User.objects.filter(
            username=attrs.get("username")).first()

        if user_obj:
            credentials['username'] = user_obj.username

        return super().validate(credentials)


class RegisterSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


    class Meta:
        model = User
        fields = ( 'username', 'email', 'password', 'first_name', 'last_name', 'token')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self,validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()


        return user




class DonneesParcelleSerializer(serializers.ModelSerializer):  # forms.ModelForm

    class Meta:
        model = DonneesParcelle
        fields = ['id','parcelleId','date_reception_donnee','humidite_sol','quantite_eau_litre']
        read_only_fields = ['id']





class DonneesUserSerializer(serializers.ModelSerializer):  # forms.ModelForm
    userId = UserSerializer(many=False, read_only=True)

    class Meta:
        model = DonneesUser
        fields = ['id', 'userId','date_reception_donnee','temperature_exterieur','humidite_exterieur']
        read_only_fields = ['id']
