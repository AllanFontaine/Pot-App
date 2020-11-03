from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from appli.models import Plantes, Parcelle
from django.contrib.auth.hashers import make_password
from django.core import exceptions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import django.contrib.auth.password_validation as validators
from rest_framework_jwt.settings import api_settings

UserModel = get_user_model()


class PlantesSerializer(serializers.ModelSerializer):  # forms.ModelForm
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Plantes
        fields = [
            'url',
            'id',
            'nom',
            'taux_ideal_eau',
            'description',
            'image',
        ]
        read_only_fields = ['id']

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request=request)



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [ 'id', 'email', 'last_name', 'first_name', 'password', 'username' ]

    def validate_password (self, password) :
        return make_password(password)


class ParcelleSerializer(serializers.ModelSerializer):  # forms.ModelForm
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Parcelle
        fields = [
            'url',
            'id',
            'user',
            'numero_parcelle',
            'taille',
            'plante',
        ]
        read_only_fields = [
            'id']

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request=request)


class ParcellePlanteSerializer(serializers.ModelSerializer):  # forms.ModelForm
    url = serializers.SerializerMethodField(read_only=True)
    plante = PlantesSerializer(many=False, read_only=True)

    class Meta:
        model = Parcelle
        fields = [
            'url',
            'id',
            'user',
            'numero_parcelle',
            'taille',
            'plante',
        ]
        read_only_fields = [
            'id']

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request=request)



class CustomJWTSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["username"] = user.username
        token["id"] = user.id

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
    token = CustomJWTSerializer(user)

    def validate(self, data):
        password = data.get('password')
        errors = dict()
        try:
            validators.validate_password(password=password)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(RegisterSerializer, self).validate(data)

    def create(self, validated_data):

        user = UserModel.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password', 'token')

    def validate_password (self, password) :
        return make_password(password)


class UserParcelleSerializer(serializers.ModelSerializer):
    parcelle = ParcellePlanteSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'parcelle']
