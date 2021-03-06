# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-07-30 16:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hxldash', '0016_auto_20190730_1610'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tablefield',
            old_name='column_num',
            new_name='columnNum',
        ),
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
