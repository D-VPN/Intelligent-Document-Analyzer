from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import AutoField

class User(AbstractUser):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    organization_name = models.CharField(verbose_name='organization', max_length=255)
    REQUIRED_FIELDS = ['username', 'organization_name', 'first_name', 'last_name']
    USERNAME_FIELD = 'email'

    def get_username(self) -> str:
        return super().email