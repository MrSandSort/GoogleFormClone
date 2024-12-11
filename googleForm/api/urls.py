from django.urls import include, path
from quiz.views import QuestionAPI, FormAPI, StoreResponseAPI, FormResponsesAPI

urlpatterns=[
    path('questions/', QuestionAPI.as_view()),
    path('form/<pk>/',FormAPI.as_view()),
    path('form/responses/<pk>/',FormResponsesAPI.as_view()),
    path('store-responses/', StoreResponseAPI.as_view())
]