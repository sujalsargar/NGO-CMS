from django.contrib import admin
from .models import Donation

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['donor_name', 'amount', 'project', 'payment_method', 'status', 'date']
    list_filter = ['status', 'payment_method', 'frequency', 'date']
    search_fields = ['donor_name', 'donor_email']
    date_hierarchy = 'date'