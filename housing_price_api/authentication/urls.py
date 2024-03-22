from django.urls import path

from authentication.views import RegisterView, LoginAPIView, VerifyEmail

urlpatterns = [
    # Register
    path('register/', RegisterView.as_view(), name='register'),

    # Login
    path('login/', LoginAPIView.as_view(), name='login'),

    # Verify email
    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
]