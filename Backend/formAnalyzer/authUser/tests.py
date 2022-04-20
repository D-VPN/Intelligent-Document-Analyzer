from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase
from http import HTTPStatus


class RegistrationTest(APITestCase):
    def setUp(self):

        self.User = get_user_model()
        self.client = APIClient()

        self.user_data = {
            "username": "alice27",
            "organization_name": "CryptoWorld",
            "first_name": "Alice",
            "last_name": "Doe",
            "email": "alice@gmail.com",
            "password": "alskdjfhg123",
            "re_password": "alskdjfhg123",
        }

    def test_register_pass(self):
        """
        testing registration API - Pass
        """

        response = self.client.post("/auth/users/", self.user_data, format="json")
        self.assertEqual(response.status_code, HTTPStatus.CREATED)

    def test_register_fail(self):
        """
        testing registration API - Fail
        """
        self.user_data.pop("re_password")

        response = self.client.post("/auth/users/", self.user_data, format="json")
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)


class LoginTest(APITestCase):
    def setUp(self):

        self.User = get_user_model()
        self.client = APIClient()
        self.login_data = {
            "username": "alice27",
            "email": "alice@gmail.com",
            "password": "alskdjfhg123",
        }

        self.new_user = self.User.objects.create(
            username=self.login_data["username"], email=self.login_data["email"]
        )
        self.new_user.set_password(self.login_data["password"])
        self.new_user.save()

    def test_login_pass(self):
        """
        testing login functionality - Pass
        """

        response = self.client.login(
            email=self.login_data["email"], password=self.login_data["password"]
        )
        self.assertTrue(response)

    def test_login_fail(self):
        """
        testing login functionality - Fail
        """

        response = self.client.login(
            email=self.login_data["username"], password=self.login_data["password"]
        )
        self.assertFalse(response)
