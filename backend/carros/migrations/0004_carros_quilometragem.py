# Generated by Django 4.1.6 on 2023-07-19 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carros', '0003_alter_carros_foto'),
    ]

    operations = [
        migrations.AddField(
            model_name='carros',
            name='quilometragem',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
