from rest_framework import serializers
from .models import Item
from django.contrib.auth.models import User

# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = (
#             'id',
#             'last_login',
#             'email',
#             'name',
#             'is_active',
#             'joined_at',
#             'password'
#         )
#         read_only_fields = ('last_login', 'is_active', 'joined_at')
#         extra_kwargs = {
#             'password': {'required': True, 'write_only': True},
#             'name': {'required': True}
#         }

#     @staticmethod
#     def validate_email(value):
#         return validate_username(value)

#     def create(self, validated_data):
#         return User.objects.create_user(
#                     validated_data.pop('email'),
#                     validated_data.pop('password'),
#                     **validated_data
#                 )


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'item_name', 'price', 'discount_price',
                  'description')

class CreateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('name', 'price', 'discount_price',
                  'description', 'image')
