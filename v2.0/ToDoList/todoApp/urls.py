from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('tasks', Dashboard.as_view(), name='dashboard'),
    path('tasks/create', Create_task.as_view(), name='create_task'),
    path('tasks/update/<int:pk>', UpdateTask.as_view(), name='update_task'),
    path('tasks/delete/<int:pk>', DeleteTask.as_view(), name='delete_task'),
    path('tasks/clear_completed', ClearCompletedTasks.as_view(), name='clear_completed_tasks'),
    path('tasks/clear_all', ClearTasks.as_view(), name='clear_all_tasks'),
]