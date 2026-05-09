from rest_framework import routers
from rest_framework.routers import DefaultRouter

from django.urls import include, path
from .views import CatViewSet, create_breeder

router = routers.DefaultRouter()
router.register('cats', CatViewSet, basename='cats')


urlpatterns = [
    path("", include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('register/', create_breeder, name='register-breeder'),
]
