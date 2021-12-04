from django import forms
from django.forms.fields import ImageField


class ProjetForm(forms.Form):
    project_name = forms.CharField(label="Project Name", max_length=100, required=True)
    template = forms.ImageField(required=True)


class TextForm(forms.Form):
    text_form = forms.ImageField(required=True)
