from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LogInUserSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from rest_framework.response import Response
from .models import Question, Form, Responses, ResponseAnswer, Choices, CustomUser
from .serializers import QuestionSerializer, FormSerializer, ResponseSerializer,FormResponseSerializers, RegisterUserSerializer

class LogInView(TokenObtainPairView):
    serializer_class= LogInUserSerializer

class RegisterView(APIView):

    def get(self,requesrt):
        queryset= CustomUser.objects.all()
        serializer= RegisterUserSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionAPI(APIView):

   def get(self, request):
       queryset= Question.objects.all()
       serializers= QuestionSerializer(queryset, many=True)
       return Response({"status":True, "messages":"Questions fetched successfully","data":serializers.data })
      
class FormViewAPI(APIView):

    permission_classes=[IsAuthenticated]

    def get(self,request):
        queryset= Form.objects.all()
        serializer= FormSerializer(queryset, many=True)
        return Response({"status":True, "messages":"Forms fetched successfully","data":serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = FormSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            form= serializer.save()
            return Response({"status":True, "messages":"Form created successfully","data":FormSerializer(form).data}, status=status.HTTP_201_CREATED)
        return Response({"errors":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class FormAPI(APIView):

    def get(self,request, pk):
        queryset= Form.objects.get(code=pk)
        serializer= FormSerializer(queryset)
        return Response(
            {"status":True, 
             "messages":"Questions fetched successfully",
             "data":serializer.data })
    
    
class FormResponsesAPI(APIView):

    def get(self,request, pk):
        queryset= Form.objects.filter(code=pk)
        serializer= FormResponseSerializers(queryset)
        return Response(
            {"status":True, 
             "messages":"responses fetched successfully",
             "data":serializer.data })
    
class StoreResponseAPI(APIView):

    def post(self,request):
        data= request.data 

        with transaction.atomic():
            if data.get('form_code') is None or data.get('responses') is None:
                return Response({
                "status": False,
                "message":"Form_code and responses are required."
            })  
            responses= data.get('responses')
            response_obj= Responses.objects.create(form= Form.objects.get(code= data.get('form_code')))

            for response in responses:
                question= Question.objects.get(code= response['question_id'])

                for answer in response['answer']:
                    if question.question_type in ['long answer','short answer']:

                        answer_obj= ResponseAnswer.objects.create(
                            answer= answer,
                            answer_to= question
                        )
                    else:
                        answer_obj= ResponseAnswer.objects.create(
                            answer= Choices.objects.get(id=answer),
                            answer_to= question
                        )

                    response_obj.responses.add(response_obj)

            return Response({
                "status": True,
                "message":"Your responses are captured!"
            })

        return Response({"status": False, "message":"Something went wrong"})        