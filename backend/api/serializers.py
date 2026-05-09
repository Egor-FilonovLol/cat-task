from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .consts import MAX_LENGTH
from .models import Breeder, Cat

User = get_user_model()

class BreederSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=MAX_LENGTH,
                                     required=True)
    password = serializers.CharField(min_length=8,
                                     required=True,
                                     write_only=True)
    email = serializers.EmailField(required=True)


    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'], 
            email=validated_data['email']
        )
        Breeder.objects.create(user=user)
        return user
    
class CatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cat 
        fields = ('id', 'name', 'age', 'weight', 'breed')
        read_only_fields = ('id',) 
