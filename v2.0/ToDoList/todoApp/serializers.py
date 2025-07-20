from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'created_at', 'completed']
        read_only_fields = ['created_at']  # created_at should not be editable
        extra_kwargs = {
            'title': {'required': True, 'allow_blank': False},
        }

    def validate_title(self, value):
        if not isinstance(value, str):
            raise serializers.ValidationError("Title must be a string.")
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        
        if len(value) > 50:
            raise serializers.ValidationError("Title cannot exceed 50 characters.") 
        return value
                   