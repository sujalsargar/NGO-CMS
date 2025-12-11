from django.urls import path
from .views import DonationCreateView, DonationListView, UserDonationListView

urlpatterns = [
    path('', DonationCreateView.as_view(), name='donation-create'),
    path('all/', DonationListView.as_view(), name='donation-list'),
    path('user/', UserDonationListView.as_view(), name='user-donations'),
]