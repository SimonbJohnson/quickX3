# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-08-07 10:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hxldash', '0019_auto_20190806_1531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboardconfig',
            name='dataTable',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hxldash.DataTable'),
        ),
        migrations.AlterField(
            model_name='tablefield',
            name='dataTable',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tableField', to='hxldash.DataTable'),
        ),
    ]
