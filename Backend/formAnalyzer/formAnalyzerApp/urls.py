from django.urls import path
from .views import home, textExtraction,projectCreate

urlpatterns = [
    path("api/", home, name="api"),
    path("create-project/", projectCreate, name="create-project"),
    path("extraction-api/", textExtraction, name="text-extraction"),
]
