from django.urls import path
from .views import MediaListCreateView, MediaDetailView

urlpatterns = [
    path('', MediaListCreateView.as_view(), name='media-list'),
    path('<int:pk>/', MediaDetailView.as_view(), name='media-detail'),
]