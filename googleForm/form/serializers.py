from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db import transaction
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework.exceptions import AuthenticationFailed
from .models import Question, Choices, Form, Responses, ResponseAnswer, CustomUser

class RegisterUserSerializer(serializers.ModelSerializer):
    password= serializers.CharField(write_only=True,min_length=8 )
    class Meta:
        model= CustomUser
        fields = ['employee_id', 'email', 'password', 'username','role']

    def create_user(self, validated_data):
        with transaction.atomic():

            user= CustomUser.objects.create_user(
            username= validated_data['username'],    
            employee_id= validated_data['employee_id'],
            email=validated_data['email'],
            role=validated_data['role'],
            )
            user.set_password(validated_data['password'])
            user.save()
            return user  

    def create(self, validated_data):
        return self.create_user(validated_data)

   
class LogInUserSerializer(TokenObtainPairSerializer):    
    employee_id = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        employee_id= attrs.get('employee_id')
        password= attrs.get('password')

        try:

            user= CustomUser.objects.get(employee_id=employee_id)

            if not user.check_password(password):
                
                raise AuthenticationFailed("Invalid password.")
            
            if not user.username:
                raise AuthenticationFailed("Username is required.")

            if not user.is_active:
                raise AuthenticationFailed("This user is inactive.")
        except:
            raise AuthenticationFailed("User with this employee_id doesn't exist")

        
        data = super().validate(attrs)
        update_last_login(None, user)

        data["employee_id"] = user.employee_id
        return data

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude=["created_at","updated_at"]

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        exclude=["created_at","updated_at","creator","id"]

    def to_representation(self, instance):
        questions=[]
        for question in instance.questions.all():
            choices=None
            if question.question_type in ["multiple choices","checkbox"]:
                choices=[]
                for choice in question.choices.all():
                    choices.append({"id":choice.id, "choices": choice.choice})

            questions.append({
                "id":question.id,
                "question": question.question,
                "question_type": question.question_type,
                "required": question.required,
                "choices":choices
            }) 

        data={
            "code": instance.code,
            "title": instance.title,
            "background_color": instance.background_color,
            "questions":questions

        }          
        
        return data 


class ResponseAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model=ResponseAnswer
        fields='__all__'

    def to_representation(self, instance):
        data={
            'answer':instance.answer,
            'answer_to':{
                'question': instance.answer_to.question,
                'question_type':instance.answer_to.question_type
            }
        }
        return data    

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model= Responses
        exclude=['created_at','updated_at']


    def to_representation(self, instance):
        data={
            "id": instance.id,
            "code": instance.code,
            "responder_email":instance.responder_email,
            "answers": ResponseAnswerSerializer(instance.responses.all(), many=True).data,

        }

        return data

class FormResponseSerializers(serializers.ModelSerializer):
    class Meta:
        model=Form
        exclude=["id","created_at","updated_at","creator"]

    def to_representation(self, instance):
        queryset= Form.objects.filter(form=instance)
        data={
            "code":instance.code,
            "title":instance.title,
            "background_color": instance.background_color,
            "responses": ResponseSerializer(instance, many=True).data
        }
        return data    

