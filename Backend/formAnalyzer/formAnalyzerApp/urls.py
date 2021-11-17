from django.urls import path
from .views import home, createProject

urlpatterns = [
    path('api/', home, name='api'),
    path('create-project/', createProject, name='create-project')
]
