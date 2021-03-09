from django.contrib.auth.hashers import make_password
from django.db import IntegrityError

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from api.models import CustomUser
from api.serializers import UserSerializerWithToken, MyTokenObtainPairSerializer


@api_view(["POST"])
def register_user(request):
    data = request.data
    try:
        user = CustomUser.objects.create_user(
            email=data.get('email'),
            username=data.get('username'),
            first_name=data.get('first_name'),
            password=make_password(data.get('password'))
        )
        serializer = MyTokenObtainPairSerializer.get_token(user)
        return Response(serializer.data)
    except IntegrityError:
        message = {'detail': 'User with this email is already registered'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
