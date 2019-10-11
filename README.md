# HXLDash
A dashboarding tool to build quick visualisation utilising the power of the Humanitarian Exchange Lanaguage (HXL)

https://hxldash.com/

# Install

Built using Python 2.7

## Install django

pip install django

## Install database connector. For postgresql

pip install psycopg2

## Install cookie banner

pip install django-cookie-law
Full instructions for install here:
https://github.com/TyMaszWeb/django-cookie-law

## Change database settings in settings.py for your database

Create a copy of the settings.py template and rename as settings.py.
Change the database settings to connect to your database.

Example set up: https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04

## To run the test server

python manage.py runserver

