from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.forms import ModelForm, DateInput


class Plantes(models.Model):
    nom = models.CharField(max_length=100)
    taux_ideal_eau = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    image = models.ImageField('plantes', blank=True)

    def __str__(self):
        return self.nom


class Utilisateurs(models.Model):
    nom = models.CharField(max_length=20)
    mot_de_passe = models.CharField(max_length=50)
    mail = models.EmailField(max_length=254)

    def __str__(self):
        return self.nom
