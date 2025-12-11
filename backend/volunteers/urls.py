from django.urls import path
from .views import VolunteerCreateView, VolunteerListView

urlpatterns = [
    path('', VolunteerCreateView.as_view(), name='volunteer-create'),
    path('all/', VolunteerListView.as_view(), name='volunteer-list'),
]