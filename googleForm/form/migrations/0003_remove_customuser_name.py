# Generated by Django 5.1.3 on 2024-12-14 09:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0002_customuser_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='name',
        ),
    ]