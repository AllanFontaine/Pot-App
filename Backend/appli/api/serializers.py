from rest_framework import serializers
from django.contrib.auth.models import User
from appli.models import Plantes, Parcelle
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class PlantesSerializer(serializers.ModelSerializer):  # forms.ModelForm
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Plantes
        fields = [
            'url',
            'id',
            'taux_ideal_eau',
            'description',
            'image',
        ]
        read_only_fields = ['id']  # bon par exemple pour les données d utilisateur  (voir views pour traiter erreur
        # lors d un post sans utilisateur

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request=request)

    # Serializer does 2 things:
    # converts to JSON and validations for data passed



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [ 'id', 'email', 'last_name', 'first_name', 'password', 'is_staff', 'username' ]

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



class CustomJWTSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["is_staff"] = user.is_staff
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
    class Meta:
        model = User
        fields = ( 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self,validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user