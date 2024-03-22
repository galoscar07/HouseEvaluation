from django.http import Http404
from django_rest import permissions
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from algo.predictor import DatasetCreator
from .models import House
from .serializers import HouseSerializer


class HouseListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    @swagger_auto_schema(
        operation_description="Get list of all houses",
        responses={200: HouseSerializer(many=True)}
    )
    def get(self, request):
        houses = House.objects.filter(user=request.user)
        serializer = HouseSerializer(houses, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Predict the price of a new house",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'longitude': openapi.Schema(type=openapi.TYPE_NUMBER),
                'latitude': openapi.Schema(type=openapi.TYPE_NUMBER),
                'housing_median_age': openapi.Schema(type=openapi.TYPE_NUMBER),
                'total_rooms': openapi.Schema(type=openapi.TYPE_NUMBER),
                'total_bedrooms': openapi.Schema(type=openapi.TYPE_NUMBER),
                'population': openapi.Schema(type=openapi.TYPE_NUMBER),
                'households': openapi.Schema(type=openapi.TYPE_NUMBER),
                'median_income': openapi.Schema(type=openapi.TYPE_NUMBER),
                'ocean_proximity': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['longitude', 'latitude', 'housing_median_age', 'total_rooms', 'total_bedrooms', 'population',
                      'households', 'median_income', 'ocean_proximity']
        ),
        responses={201: HouseSerializer()}
    )
    def post(self, request):
        serializer = HouseSerializer(data=request.data)
        if serializer.is_valid():
            # Extract parameters from request data
            parameters = serializer.validated_data
            # Instantiate the model predictor
            prediction = DatasetCreator().predict(parameters=parameters)[0]
            # Save the house with the predicted price
            serializer.save(price_prediction=prediction, user=request.user)
            response = serializer.data
            response['success'] = True
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HouseDetailView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return House.objects.get(pk=pk)
        except House.DoesNotExist:
            raise Http404

    @swagger_auto_schema(
        operation_description="Retrieve a specific house",
        responses={200: HouseSerializer()}
    )
    def get(self, request, pk):
        house = self.get_object(pk)
        serializer = HouseSerializer(house)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update a specific house",
        request_body=HouseSerializer,
        responses={200: HouseSerializer()}

    )
    def put(self, request, pk):
        house = self.get_object(pk)
        serializer = HouseSerializer(house, data=request.data)
        if serializer.is_valid():
            # if something is updated recalculate the price
            parameters = serializer.validated_data
            prediction = DatasetCreator().predict(parameters=parameters)[0]
            serializer.save(price_prediction=prediction)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Delete a specific house"
    )
    def delete(self, request, pk):
        house = self.get_object(pk)
        house.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
