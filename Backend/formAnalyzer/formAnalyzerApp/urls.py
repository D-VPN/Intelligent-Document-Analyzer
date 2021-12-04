from django.urls import path
from .views import home, CreateProjectView, textExtraction

urlpatterns = [
    path("api/", home, name="api"),
    path("create-project/", CreateProjectView, name="create-project"),
    path("extraction-api/", textExtraction, name="text-extraction"),
]
