from rest_framework.filters import BaseFilterBackend
import coreapi

class ParcellePlantesFilter(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [coreapi.Field(
            name='order_nameplant',
            location='query',
            required=False,
            type='string'
        ), coreapi.Field(
            name='userid',
            location='query',
            required=False,
            type='integer' 
        )]

    