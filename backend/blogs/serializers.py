from rest_framework import serializers
from .models import Blog
from accounts.serializers import UserSerializer

class BlogSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source='author', read_only=True)
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']