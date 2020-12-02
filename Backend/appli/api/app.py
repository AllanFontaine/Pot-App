from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _

class ApiConfig(AppConfig):
    name = 'appli.api'
    verbose_name = _('api')

    def ready(self):
        import api.signals  # noqa