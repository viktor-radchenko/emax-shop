import pytest

from django.urls import reverse
from django.contrib.auth import get_user_model


@pytest.mark.django_db
def test_create_user():
    User = get_user_model()
    user = User.objects.create_user(email='test@test.com', password="foobar")
    assert user.email == 'test@test.com'
    assert user.is_active
    assert not user.is_staff
    assert not user.is_superuser

@pytest.mark.django_db
def test_create_super_user():
    User = get_user_model()
    admin_user = User.objects.create_superuser('super@user.com', 'foo')
    assert admin_user.email == 'super@user.com'
    assert admin_user.is_active
    assert admin_user.is_staff
    assert admin_user.is_superuser


# def test_user_create():
#     User.objects.create_user('john', 'lennon@mail.com', 'testing321')
#     assert User.objects.count() == 1


# @pytest.mark.django_db
# def test_api_route(client):
#     url = reverse('products')
#     response = client.get(url)
#     assert response.status_code == 200
#     assert b'_id' in response.content


def test_single_product(client):
    url = reverse('product', args=['2'])
    response = client.get(url)
    assert response.status_code == 200
    assert b'iPhone' in response.content
