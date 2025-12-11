from django.contrib import admin
from .models import Media

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ['caption', 'type', 'url', 'created_at']
    list_filter = ['type', 'created_at']
    search_fields = ['caption']