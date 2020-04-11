from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from hxldash.views import saveConfig
import json

class Command(BaseCommand):
	help = 'Populate the database with some initial dashboards'

	def handle(self, *args, **kwargs):
		with open('hxldash/management/commands/data.json') as f:
  			configs = json.load(f)
  			for config in configs:
  				saveConfig(config,'','','Demo data','Demo data')
		self.stdout.write("Success")