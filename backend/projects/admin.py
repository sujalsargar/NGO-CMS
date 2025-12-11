from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'start_date', 'end_date', 'beneficiaries', 'status']
    list_filter = ['status', 'start_date']
    search_fields = ['title', 'location']
    date_hierarchy = 'start_date'