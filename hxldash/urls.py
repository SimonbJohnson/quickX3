from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create/(?P<url>.*)$', views.create, name='create'),
    url(r'^save$', views.save, name='save'),
    url(r'^view/(?P<id>.*)$', views.view, name='view'),
    url(r'^passwordset/(?P<page>.*)/(?P<id>.*)$', views.setpassword, name='setpassword'),
]