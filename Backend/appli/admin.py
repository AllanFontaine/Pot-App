from django.contrib import admin
from .models import Parcelle, Plantes, DonneesParcelle, DonneesUser, Profile

# Register your models here.

admin.site.register(Parcelle)
admin.site.register(Plantes)
admin.site.register(DonneesParcelle)
admin.site.register(DonneesUser)
admin.site.register(Profile)