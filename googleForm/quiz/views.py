from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Question, Form
from .serializers import QuestionSerializer, FormSerializer

class QuestionAPI(APIView):

   def get(self, request):
       queryset= Question.objects.all()
       serializers= QuestionSerializer(queryset, many=True)
       return Response({"status":True, "messages":"Questions fetched successfully","data":serializers.data })
      
class FormAPI(APIView):
    
    def get(self,request, pk):
        queryset= Form.objects.get(code=pk)
        serializer= FormSerializer(queryset)
        return Response(
            {"status":True, 
             "messages":"Questions fetched successfully",
             "data":serializer.data })

        