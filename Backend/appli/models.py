from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from rest_framework.reverse import reverse as api_reverse


class Plantes(models.Model):
    nom = models.CharField(max_length=100)
    taux_ideal_eau = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    image = models.ImageField('plantes', upload_to='media', blank=True)

    def __str__(self):
        return self.nom

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-plant", kwargs={'pk': self.pk}, request=request)


class Utilisateurs(models.Model):
    nom = models.CharField(max_length=20)
    mot_de_passe = models.CharField(max_length=50)
    mail = models.EmailField(max_length=254)

    def __str__(self):
        return self.nom

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-util", kwargs={'pk': self.pk}, request=request)


class Parcelle(models.Model):
    numero_parcelle = models.IntegerField()
    user = models.ForeignKey(Utilisateurs, on_delete=CASCADE)
    plante = models.ForeignKey(Plantes, on_delete=CASCADE)
    taille = models.FloatField()

    def __str__(self):
        return "Parcelle numéro " + self.numero + "appartenant à " + self.user + " contenant " + self.plante

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-parce", kwargs={'pk': self.pk}, request=request)
