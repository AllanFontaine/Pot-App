# Generated by Django 3.1.2 on 2020-12-15 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appli', '0019_auto_20201215_2037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='code',
            field=models.CharField(default='code', max_length=255, unique=True),
        ),
    ]
