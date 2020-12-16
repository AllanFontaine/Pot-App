from django.apps import AppConfig


class AppliConfig(AppConfig):
    name = 'appli'
    def ready(self):
        import appli.signals  # noqa