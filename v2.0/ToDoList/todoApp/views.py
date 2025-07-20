from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

# Create your views here.

class Dashboard(generics.ListAPIView):
    """
    List all tasks. (GET request) with  ListAPIView
    This view returns a list of all tasks ordered by creation date.
    It uses the TaskSerializer to serialize the Task model instances.
    """
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

class Create_task(generics.CreateAPIView):
    """
    Create a new task. (POST request) with CreateAPIView
    This view allows the creation of a new task using the TaskSerializer.
    It validates the input data and saves the new task to the database.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class UpdateTask(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class DeleteTask(generics.DestroyAPIView):
    """
    Delete a task. (DELETE request) with DestroyAPIView
    This view allows the deletion of a task by its primary key (pk).
    It uses the TaskSerializer to serialize the Task model instances.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class ClearCompletedTasks(APIView):
    """
    Clear all completed tasks. (DELETE request)
    """
    def delete(self, request):
        count, _ = Task.objects.filter(completed=True).delete()
        return Response({'deleted': count}, status=status.HTTP_204_NO_CONTENT)

class ClearTasks(APIView):
    """
    Clear all tasks. (DELETE request)
    """
    def delete(self, request):
        count, _ = Task.objects.all().delete()
        return Response({'deleted': count}, status=status.HTTP_204_NO_CONTENT)

