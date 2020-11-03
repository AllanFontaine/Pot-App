from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.contrib.auth.models import User
from rest_framework.reverse import reverse as api_reverse


class Plantes(models.Model):
    nom = models.CharField(max_length=100)
    taux_ideal_eau = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    image = models.ImageField('plantes', upload_to='./Img', blank=True)

    def __str__(self):
        return self.nom

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-plant", kwargs={'pk': self.pk}, request=request)


class Parcelle(models.Model):
    numero_parcelle = models.IntegerField()
    user = models.ForeignKey(User, related_name='parcelle', on_delete=CASCADE)
    plante = models.ForeignKey(Plantes, related_name='parcelle', on_delete=CASCADE)
    taille = models.FloatField()

    def __str__(self):
        return "Parcelle numéro " + self.numero + "appartenant à " + self.user + " contenant " + self.plante

    def get_api_url(self, request=None):
        return api_reverse("api-appli:post-rud-parce", kwargs={'pk': self.pk}, request=request)


"""class User(AbstractBaseUser, PermissionsMixin):
    \"""
    Defines our custom user class.
    Username, email and password are required.
    \"""

    username = models.CharField(db_index=True, max_length=255, unique=True)

    email = models.EmailField(
        validators=[validators.validate_email],
        unique=True,
        blank=False
        )

    is_staff = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    # The `USERNAME_FIELD` property tells us which field we will use to log in.
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ('username',)

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        \"""
        Returns a string representation of this `User`.
        This string is used when a `User` is printed in the console.
        \"""
        return self.username

    @property
    def token(self):
        \"""
        Allows us to get a user's token by calling `user.token` instead of
        `user.generate_jwt_token().

        The `@property` decorator above makes this possible. `token` is called
        a "dynamic property".
        \"""
        return self._generate_jwt_token()

    def get_full_name(self):
        \"""
        This method is required by Django for things like handling emails.
        Typically this would be the user's first and last name. Since we do
        not store the user's real name, we return their username instead.
        \"""
        return self.username

    def get_short_name(self):
        \"""
        This method is required by Django for things like handling emails.
        Typically, this would be the user's first name. Since we do not store
        the user's real name, we return their username instead.
        \"""
        return self.username

    def _generate_jwt_token(self):
        \"""
        Generates a JSON Web Token that stores this user's ID and has an expiry
        date set to 60 days into the future.
        \"""
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')"""
