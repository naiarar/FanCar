# Generated by Django 4.1.6 on 2023-07-15 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carros', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carros',
            name='ano_fabricacao',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='carros',
            name='ano_modelo',
            field=models.IntegerField(),
        ),
    ]
