from django.db import models

from authentication.models import User


class House(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    longitude = models.FloatField()
    latitude = models.FloatField()
    housing_median_age = models.FloatField()
    total_rooms = models.FloatField()
    total_bedrooms = models.FloatField()
    population = models.FloatField()
    households = models.FloatField()
    median_income = models.FloatField()
    ocean_proximity = models.CharField(max_length=100)
    price_prediction = models.FloatField()

    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"House at {self.longitude}, {self.latitude}"
