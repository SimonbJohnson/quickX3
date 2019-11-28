from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create/(?P<url>.*)$', views.create, name='create'),
    url(r'^save$', views.save, name='save'),
    url(r'^view/(?P<id>.*)$', views.view, name='view'),
    url(r'^iframe/(?P<id>.*)$', views.iframe, name='iframe'),
    url(r'^print/(?P<id>.*)$', views.printview, name='print'),
    url(r'^passwordset/(?P<page>.*)/(?P<id>.*)$', views.setpassword, name='setpassword'),
    url(r'^edit/(?P<id>.*)$', views.edit, name='edit'),
    url(r'^update/(?P<id>.*)$', views.update, name='update'),
    url(r'^catalogue$', views.catalogue, name='catalogue'),
    url(r'^load$', views.load, name='load'),
    url(r'^info$', views.info, name='info'),
    url(r'^info/(?P<section>\w+)$', views.info, name='info'),
    url(r'^info/tutorials/(?P<section>\w+)$', views.tutorials, name='tutorials'),
]