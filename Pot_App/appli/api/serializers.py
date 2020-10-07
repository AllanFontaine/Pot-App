from rest_framework import serializers
from appli.models import Plantes, Utilisateurs, Parcelle


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


class UtilisateursSerializer(serializers.ModelSerializer):  # forms.ModelForm
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Utilisateurs
        fields = [
            'url',
            'id',
            'nom',
            'mot_de_passe',
            'mail',
        ]
        read_only_fields = [
            'id']

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request=request)


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
