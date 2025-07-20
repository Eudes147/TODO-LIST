from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

# Create your models here.
max_length = 15
class Task(models.Model):
    name = models.CharField(max_length=max_length,unique=True,verbose_name="Nom")
    done = models.BooleanField(default=False,verbose_name="Fait")
    deadline = models.DateField(default= timezone.now().date())

    class Meta:
        verbose_name = "Tâche"
        verbose_name_plural = "Tâches"
    
    def __str__(self):
        return self.name
    
    def clean(self):
        if self.deadline < timezone.now().date():
            raise ValidationError('La date ne peut être inférieur à la date du jour.')
        

