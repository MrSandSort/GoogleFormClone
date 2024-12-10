from rest_framework import serializers
from .models import Question, Choices, Form

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