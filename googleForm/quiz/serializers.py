from rest_framework import serializers
from .models import Question, Choices, Form

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude=["created_at","updated_at"]