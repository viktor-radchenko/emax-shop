import jwt

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.conf import settings
from api.models import CustomUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["email"] = user.email
        token["first_name"] = user.first_name
        return token


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name', 'is_admin']

    # custom user fields
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get_is_admin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['access', 'refresh']

    def get_access(self, obj):
        token = RefreshToken.for_user(obj)
        access_token = token.access_token

        decode_jwt = jwt.decode(str(access_token), settings.SECRET_KEY, algorithms=['HS256'])
        decode_jwt['username'] = obj.username
        decode_jwt['email'] = obj.email
        decode_jwt['first_name'] = obj.first_name

        encoded_access_token = jwt.encode(decode_jwt, settings.SECRET_KEY, algorithm='HS256')
        return str(encoded_access_token)

    def get_refresh(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)
