from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .consts import MAX_LENGTH

User = get_user_model()

class Breeder(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='breeder')



class Cat(models.Model):
    owner = models.ForeignKey(Breeder,
                                on_delete=models.CASCADE,
                                related_name='cats')
    name = models.CharField(max_length=MAX_LENGTH,
                            verbose_name='имя кота') 
    weight = models.PositiveSmallIntegerField(verbose_name='Вес Кота', validators=[MinValueValidator(1), MaxValueValidator(21)])
    age = models.PositiveSmallIntegerField(verbose_name='возраст кота', validators=[MinValueValidator(1), MaxValueValidator(50)])
    breed = models.CharField(max_length=MAX_LENGTH, verbose_name='порода')
    class Meta:
        verbose_name = ("Кот")
        verbose_name_plural = ("Коты")

    def __str__(self):
        return self.name

