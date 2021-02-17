import uuid

import pytest

from django.urls import reverse
from django.contrib.auth import get_user_model


@pytest.fixture
def test_password():
    return 'test-strong-password'


@pytest.fixture
def create_user(db, django_user_model, test_password):
    def make_user(**kwargs):
        kwargs['password'] = test_password
        if 'username' not in kwargs:
            kwargs['username'] = str(uuid.uuid4())
        if 'email' not in kwargs:
            kwargs['email'] = 'test@test.com'
        if 'first_name' not in kwargs:
            kwargs['first_name'] = "Sam"
        if 'is_active' not in kwargs:
            kwargs['is_active'] = True
        return django_user_model.objects.create_user(**kwargs)
    return make_user


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


def test_user_routes(client):
    url = reverse('login')
    response = client.get(url)
    assert response.status_code == 405


@pytest.mark.django_db
def test_create_user():
    User = get_user_model()
    user = User.objects.create_user(
        email="test@test.com",
        username="test_user",
        first_name="First",
        password="foobar",
    )
    assert user.email == "test@test.com"
    assert not user.is_active
    assert not user.is_staff
    assert not user.is_superuser


@pytest.mark.django_db
def test_create_super_user():
    User = get_user_model()
    admin_user = User.objects.create_superuser(
        email="super@user.com",
        username="test_admin",
        first_name="Admin",
        password="foo",
    )
    assert admin_user.email == "super@user.com"
    assert admin_user.is_active
    assert admin_user.is_staff
    assert admin_user.is_superuser


@pytest.mark.django_db
def test_create_user_rest_api(client):
    url = reverse('register')
    email = "test@test.com"
    username = "PytestTest"
    first_name = "Sam"
    data = {
        "email": email,
        "username": username,
        "first_name": first_name
    }
    response = client.post(url, data)
    assert response.status_code == 200
    assert response.data.get("username") == username


@pytest.mark.django_db
def test_fail_create_user(client, create_user):
    # can't create user with existing credentials
    user = create_user(username='PytestTest')
    url = reverse('register')
    data = {
        "email": user.email,
        "username": user.username,
        "first_name": user.first_name
    }
    response = client.post(url, data)
    assert response.status_code == 400
    assert response.data.get("detail") == 'User with this email is already registered'


@pytest.mark.django_db
def test_user_login(api_client, create_user, test_password):
    user = create_user()
    url = reverse('login')
    data = {
        'email': user.email,
        'password': test_password
    }
    response = api_client.post(url, data=data)
    assert response.status_code == 200
    url = reverse('profile')
    headers = {
        'HTTP_AUTHORIZATION': f'Bearer {response.data.get("access")}'
    }
    response = api_client.get(url, **headers)
    assert response.status_code == 200
    assert response.data.get("email") == user.email
