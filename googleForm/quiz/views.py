from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer

class QuestionAPI(APIView):

   def get(self, request):
       queryset= Question.objects.all()
       serializers= QuestionSerializer(queryset, many=True)
       return Response({"status":True, "messages":"Questions fetched successfully","data":serializers.data })
      
