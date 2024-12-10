from django.urls import include, path
from quiz.views import QuestionAPI, FormAPI

urlpatterns=[
    path('questions/', QuestionAPI.as_view()),
    path('form/<pk>/',FormAPI.as_view())
]