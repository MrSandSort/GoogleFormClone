from django.urls import include, path
from form.views import QuestionAPI, FormAPI, StoreResponseAPI, FormResponsesAPI, RegisterView, LogInView, FormViewAPI

urlpatterns=[
    path('questions/', QuestionAPI.as_view()),
    path('form/', FormViewAPI.as_view()),
    path('form/<pk>/',FormAPI.as_view()),
    path('addUser/', RegisterView.as_view()),
    path('form/responses/<pk>/',FormResponsesAPI.as_view()),
    path('store-responses/', StoreResponseAPI.as_view()),
    path('login/',LogInView.as_view() )
]