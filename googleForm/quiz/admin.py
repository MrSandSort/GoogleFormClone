from django.contrib import admin
from .models import Question, Choices, Form,Responses,ResponseAnswer


admin.site.register(Question)
admin.site.register(Choices)
admin.site.register(Form)
admin.site.register(Responses)
admin.site.register(ResponseAnswer)

