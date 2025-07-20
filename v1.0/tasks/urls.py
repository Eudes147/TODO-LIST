from django.urls import path
from . import views



urlpatterns = [
    path('',views.index,name="index"),
    path('delete<int:id>',views.delete,name="delete"),
    path('toggle<int:id>',views.toggle_done,name="toggle"),
]