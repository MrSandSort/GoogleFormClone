from django.db import models
from .choices import QUESTION_CHOICES
from django.contrib.auth.models import User

class BaseModel(models.Model):
    created_at= models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True) 

    class Meta:
        abstract= True

class Choices(BaseModel):
    choice= models.CharField(max_length=100)        

class Question(BaseModel):
    question= models.CharField(max_length=100)
    question_type= models.CharField(max_length=100, choices=QUESTION_CHOICES)
    required= models.BooleanField(default=True)
    choices= models.ManyToManyField(Choices, related_name='question_choices', blank=True)


class Form(BaseModel):
    code= models.CharField(max_length=100, unique=True)
    title= models.CharField(max_length=100) 
    creator= models.ForeignKey(User, on_delete=models.CASCADE)
    background_color= models.CharField(max_length=100, default='blue')  
    questions= models.ManyToManyField(Question, related_name='questions')
     