from django.contrib import auth
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from authentication.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, attrs):
        email = attrs.get('email', None)
        if not email:
            raise serializers.ValidationError('Email should not be empty')
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    refresh_token = serializers.CharField(max_length=555, read_only=True)
    access_token = serializers.CharField(max_length=555, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'refresh_token', 'access_token']

    def validate(self, attrs):
        email = attrs.get('email', None)
        password = attrs.get('password', None)

        user = auth.authenticate(username=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')

        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')

        tokens = user.tokens()

        return {
            'email': user.email,
            'refresh_token': tokens['refresh'],
            'access_token': tokens['access'],
        }
