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
from django.http import Http404
from django.utils import timezone
from rest_framework.response import Response


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
        month = obj.date_semis_debut.month
        if (month > 11 or month <= 3):
           return "Hiver"
        elif (month == 4 or month == 5):
           return "Printemps"
        elif (month >= 6 and month <= 9):
           return "Eté"
        else:
            return "Automne"

    def get_saison_fin(self, obj):
        month = obj.date_semis_fin.month
        if (month > 11 or month <= 3):
           return "Hiver"
        elif (month == 4 or month == 5):
           return "Printemps"
        elif (month >= 6 and month <= 9):
           return "Eté"
        else:
            return "Automne"

    class Meta:
        model = Plantes
        fields = [
            'id',
            'nom',
            'nom_scientifique',
            'azote_sol',
            'potassium_sol',
            'phosphore_sol',
            'date_semis_debut',
            'date_semis_fin',
            'densite_semi',
            'saison_debut',
            'saison_fin',
            'recolte_en_jours',
            'description',
            'info_insolite',
            'url_wiki',
            'image',
            'hauteur_arrosage'
        ]
        read_only_fields = ['id']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'last_name', 'first_name', 'username']

    def validate_password(self, password):
        return make_password(password)

    def update(self, instance, validated_data):
        user_same_email = ''
        print(User.objects.filter(email=validated_data['email']).exists())
        if User.objects.filter(email=validated_data['email']).exists():
            user_same_email = User.objects.filter(email=validated_data['email'])[0]
        if bool(user_same_email != instance) & User.objects.filter(email=validated_data['email']).exists():
            raise exceptions.ValidationError({
               'email': 'this email is already used.'
            })
        else:
            return super().update(instance, validated_data)


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['id', 'user', 'nombre_parcelle', 'localisation', 'code']
        extra_kwargs = {'code': {'write_only': True}}

    def create(self, validated_data):
        profile = Profile(**validated_data)
        profile.save()

        return profile 


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
            'id', 'userId']

    def create(self, validated_data):
        if self.context['request'].user.id is not None:
            print(self.context['request'].user is not None)
            parcelle = Parcelle(**validated_data)
            parcelle.userId = self.context['request'].user
            parcelle.save()
        else:
            raise exceptions.ValidationError({
                'detail': 'Authentication credentials were not provided for this method.'
            })
        return parcelle


class ParcellePlanteSerializer(serializers.ModelSerializer):
    planteId = PlantesSerializer(many=False, read_only=True)

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
            'id', 'userId']


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

        user_obj = User.objects.filter(email=attrs.get("email")).first() or User.objects.filter(
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
        fields = ('id', 'username', 'email', 'password',
                  'first_name', 'last_name', 'token')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        if User.objects.filter(email=validated_data['email']).exists():
            raise exceptions.ValidationError({
                'email': 'this email is already used.'
            })
        else:
            user = User(**validated_data)
            user.set_password(validated_data['password'])
            user.save()

            return user


class DonneesParcelleSerializer(serializers.ModelSerializer):  # forms.ModelForm

    class Meta:
        model = DonneesParcelle
        fields = ['id', 'parcelleId', 'date_reception_donnee',
                  'humidite_sol', 'quantite_eau_litre', 'code']
        read_only_fields = ['id', 'date_reception_donnee']
        extra_kwargs = {'code': {'write_only': True}}

    def create(self, validated_data):
        if Profile.objects.filter(code=self.context['request'].data['code']).exists():
            duser = DonneesParcelle(**validated_data)
            duser.date_reception_donnee = timezone.now()
            duser.save()
            return duser
        else:
            raise Exception({
                'detail': 'Authentication credentials were not provided for this method.'
            })
        


class DonneesUserSerializer(serializers.ModelSerializer):  # forms.ModelForm

    class Meta:
        model = DonneesUser
        fields = ['id', 'userId', 'date_reception_donnee',
                  'temperature_exterieur', 'humidite_exterieur', 'code']
        read_only_fields = ['id', 'date_reception_donnee']
        extra_kwargs = {'code': {'write_only': True}}

    def create(self, validated_data):
        print(Profile.objects.filter(code=self.context['request'].data['code']).filter(user_id=self.context['request'].data['userId']))
        if Profile.objects.filter(code=self.context['request'].data['code']).exists():
            duser = DonneesUser(**validated_data)
            duser.userId = Profile.objects.filter(code=self.context['request'].data['code'])[0].user
            duser.date_reception_donnee = timezone.now()
            duser.save()
            return duser  
        else:
            raise exceptions.ValidationError({
                'detail': 'Authentication credentials were not provided for this method.'
            })
