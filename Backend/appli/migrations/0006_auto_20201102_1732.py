# Generated by Django 3.1.2 on 2020-11-02 17:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('appli', '0005_auto_20201030_1423'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parcelle',
            name='plante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parcelle', to='appli.plantes'),
        ),
        migrations.AlterField(
            model_name='parcelle',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parcelle', to=settings.AUTH_USER_MODEL),
        ),
    ]
