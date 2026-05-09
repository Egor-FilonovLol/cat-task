from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .models import Cat, Breeder
from .permissions import CatPermission
from .serializers import CatSerializer, BreederSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


class CatViewSet(viewsets.ModelViewSet):
    serializer_class = CatSerializer
    permission_classes = [CatPermission]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'breeder'):
            return Cat.objects.filter(owner=user.breeder)
        return Cat.objects.none()
    def perform_create(self, serializer):
        user = self.request.user 
        if not hasattr(user, 'breeder'):
            raise ValidationError('нужно зарегестрироваться как заводчик')
        serializer.save(owner=user.breeder)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_breeder(request):
    serializer = BreederSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'Пользователь успешно создан': user.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
