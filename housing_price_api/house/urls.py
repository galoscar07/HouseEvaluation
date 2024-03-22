from django.urls import path
from .views import HouseListView, HouseDetailView

urlpatterns = [
    path('', HouseListView.as_view(), name='house-list'),
    path('<int:pk>/', HouseDetailView.as_view(), name='house-detail'),
]