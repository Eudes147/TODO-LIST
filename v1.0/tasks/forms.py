from django.utils import timezone
from django import forms
from .views import Task
from datetime import date
from .models import max_length

class SomeForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ["name","deadline","done"]
        today= date.today().isoformat()
        widgets = {
            "deadline": forms.DateInput(attrs={"type":"date","placeholder":"Deadline","title":"Dealine of this task","min":today}),
            "name":forms.TextInput(attrs={"maxlength":max_length,"placeholder":f"Add a new task(max char: {max_length})","title":"Name of task"})
        }
        labels = {
            "name":"",
            "deadline":""
        }
    def cleanTask(self):
        deadline = self.cleaned_data["deadline"]
        if deadline < timezone.now().date():
            raise forms.ValidationError("Veuillez choisir une date future")
        return deadline