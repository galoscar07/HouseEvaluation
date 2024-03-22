from rest_framework import serializers

from algo.predictor import ocean_proximity_mapping
from .models import House


class HouseSerializer(serializers.ModelSerializer):
    price_prediction = serializers.FloatField(required=False)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = House
        fields = '__all__'

    def validate_ocean_proximity(self, value):
        if value not in ocean_proximity_mapping.keys():
            raise serializers.ValidationError("Invalid ocean proximity value")
        return value