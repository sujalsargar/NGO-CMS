from django.contrib import admin
from .models import Volunteer

@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'project', 'created_at']
    list_filter = ['created_at', 'project']
    search_fields = ['name', 'email', 'phone']
    date_hierarchy = 'created_at'