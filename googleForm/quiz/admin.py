from django.contrib import admin
from .models import Question, Choices, Form


admin.site.register(Question)
admin.site.register(Choices)
admin.site.register(Form)
