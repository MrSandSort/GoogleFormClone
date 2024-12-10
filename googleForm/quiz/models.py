from django.db import models
from .choices import QUESTION_CHOICES
from django.contrib.auth.models import User
from .utils import generateRandomCode

class BaseModel(models.Model):
    created_at= models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True) 

    class Meta:
        abstract= True

class Choices(BaseModel):
    choice= models.CharField(max_length=100)

    def __str__(self):
        return self.choice       

class Question(BaseModel):
    question= models.CharField(max_length=100)
    question_type= models.CharField(max_length=100, choices=QUESTION_CHOICES)
    required= models.BooleanField(default=True)
    choices= models.ManyToManyField(Choices, related_name='question_choices', blank=True)

    def __str__(self):
        return self.question

class Form(BaseModel):
    code= models.CharField(max_length=100, unique=True, blank=True)
    title= models.CharField(max_length=100) 
    creator= models.ForeignKey(User, on_delete=models.CASCADE)
    background_color= models.CharField(max_length=100, default='blue')  
    questions= models.ManyToManyField(Question, related_name='questions')

    def __str__(self):
        return self.title
    
    def save(self,*args, **kwargs):
        if not self.pk:
            self.code=generateRandomCode(8)

        super(Form,self).save(*args,**kwargs)    
     