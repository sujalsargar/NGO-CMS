from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Volunteer
from .serializers import VolunteerSerializer

class VolunteerCreateView(generics.CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [AllowAny]

class VolunteerListView(generics.ListAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [IsAdminUser]