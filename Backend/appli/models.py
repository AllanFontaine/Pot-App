from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.contrib.auth.models import User
from rest_framework.reverse import reverse as api_reverse
from django.utils import timezone

class Plantes(models.Model):
    nom = models.CharField(max_length=100)
    nom_scientifique = models.CharField(max_length=100, default = "Pas de nom scientifique encodé")
    besoin_hydrolique = models.DecimalField(max_digits=10, decimal_places=2)
    date_semis_debut = models.DateField(blank = False,  default = timezone.now)
    date_semis_fin = models.DateField(blank =False,  default = timezone.now)
    recolte_en_jours = models.IntegerField(default = 0)
    description = models.TextField(blank=True)
    url_wiki = models.TextField(blank = False, default = '')
    image = models.ImageField('plantes', upload_to='./Img', blank=True)

    def __str__(self):
        return self.nom

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-plant", kwargs={'pk': self.pk}, request=request)



class Parcelle(models.Model):
    numero_parcelle = models.IntegerField()
    userId = models.ForeignKey(User, related_name='parcelle', on_delete=CASCADE)
    planteId = models.ForeignKey(Plantes, related_name='parcelle', on_delete=CASCADE)
    date_plantation = models.DateField(blank = False, default = timezone.now)
    taille_metre_carre = models.FloatField()
    estUtilise = models.BooleanField(default = True)
    

    def __str__(self):
        return "Parcelle numéro "+ str(self.numero_parcelle)

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-parce", kwargs={'pk': self.pk}, request=request)


class DonneesParcelle(models.Model):
    parcelleId = models.ForeignKey(Parcelle, related_name='donnes', on_delete=CASCADE)
    date_reception_donnee = models.DateTimeField(default = timezone.now)
    humidite_sol = models.IntegerField()
    quantite_eau_litre = models.DecimalField(max_digits = 10, decimal_places = 2)

    def __str__(self):
        return "parcelle numéro " + self.parcelleId.id

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-dParce", kwargs={'pk': self.pk}, request=request)

class DonneesUser(models.Model):
    userId = models.ForeignKey(User, related_name='donneesUser', on_delete = CASCADE)
    date_reception_donnee = models.DateTimeField(default = timezone.now)
    temperature_exterieur = models.DecimalField(max_digits = 10, decimal_places = 2)
    humidite_exterieur = models.DecimalField(max_digits = 10, decimal_places = 2)

    def __str__(self):
        return "données du user nommé "+ self.userId.username


    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-dUser", kwargs={'pk': self.pk}, request=request)


    
