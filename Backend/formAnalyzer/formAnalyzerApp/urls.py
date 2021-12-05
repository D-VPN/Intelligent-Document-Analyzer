from django.urls import path
from .views import projectCreate, extractKeys, getAllProjects

urlpatterns = [
    path("create-project/", projectCreate, name="create-project"),
    path("extract-keys/", extractKeys, name="extract-keys"),
    path("get-projects/", getAllProjects, name="get-projects"),
]
