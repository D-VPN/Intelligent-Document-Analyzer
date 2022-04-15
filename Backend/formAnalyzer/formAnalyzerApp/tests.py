from urllib import response
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase
from http import HTTPStatus
from django.core.files.uploadedfile import SimpleUploadedFile


class SomeTest(APITestCase):
    def setUp(self):

        self.User = get_user_model()
        self.client = APIClient()

        # create a new user
        self.user_data = {
            "username": "alice27",
            "email": "alice@gmail.com",
            "password": "alskdjfhg123",
        }

        self.new_user = self.User.objects.create(
            username=self.user_data["username"], email=self.user_data["email"]
        )
        self.new_user.set_password(self.user_data["password"])
        self.new_user.save()

        # login using new user
        self.login_data = {
            "email": "alice@gmail.com",
            "password": "alskdjfhg123",
        }
        response = self.client.post(
            "/auth/token/login/", self.login_data, format="json"
        ).json()

        # add token to client
        self.token = response["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token)

    def test_extract_keys(self):

        file = SimpleUploadedFile("temp.png", b"file_content", content_type="image/png")
        response = self.client.post(
            "/extract-keys/", {"file": file}, format="multipart"
        )
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_create_project(self):

        data = {
            "name": "Employee Sentiment",
            "fields": [
                {"name": "Name", "valueType": "Text"},
                {"name": "Email", "valueType": "Text"},
                {"name": "Date Of Birth (DDMMYYYY)", "valueType": "Date"},
                {"name": "Phone Number", "valueType": "Number"},
                {"name": "How do you feel about your role?", "valueType": "Sentiment"},
                {"name": "Gender?", "valueType": "Checkbox"},
            ],
            "isHandwritten": "true",
        }
        response = self.client.post("/create-project/", data, format="json")
        self.assertEqual(response.status_code, HTTPStatus.OK)
