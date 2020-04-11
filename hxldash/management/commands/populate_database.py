from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone

class Command(BaseCommand):
	help = 'Populate the database with some initial dashboards'

	def handle(self, *args, **kwargs):
		