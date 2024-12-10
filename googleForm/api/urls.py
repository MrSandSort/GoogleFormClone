from django.urls import include, path
from quiz.views import QuestionAPI

urlpatterns=[
    path('questions/', QuestionAPI.as_view())
]