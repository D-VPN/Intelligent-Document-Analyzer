from django.urls import path
from .views import home, textExtraction, projectCreate, extractKeys

urlpatterns = [
    path("api/", home, name="api"),
    path("create-project/", projectCreate, name="create-project"),
    path("extract-keys/", extractKeys, name="extract-keys"),
    path("extraction-api/", textExtraction, name="text-extraction"),
]
