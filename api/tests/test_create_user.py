import pytest

# from django.urls import reverse
from django.contrib.auth import get_user_model


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
