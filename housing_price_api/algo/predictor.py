import logging
import sys
import pandas as pd
import time
import joblib

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

TRAIN_DATA = 'housing.csv'
MODEL_NAME = 'model.joblib'
RANDOM_STATE = 100

ocean_proximity_mapping = {
    'NEAR OCEAN': 'ocean_proximity_NEAR OCEAN',
    '<1H OCEAN': 'ocean_proximity_<1H OCEAN',
    'INLAND': 'ocean_proximity_INLAND',
    'NEAR BAY': 'ocean_proximity_NEAR BAY',
    'ISLAND': 'ocean_proximity_ISLAND'
}

feature_columns = ['longitude', 'latitude', 'housing_median_age', 'total_rooms',
                   'total_bedrooms', 'population', 'households', 'median_income',
                   'ocean_proximity_<1H OCEAN', 'ocean_proximity_INLAND',
                   'ocean_proximity_ISLAND', 'ocean_proximity_NEAR BAY',
                   'ocean_proximity_NEAR OCEAN']

ocean_proximity_columns = ['ocean_proximity_<1H OCEAN', 'ocean_proximity_INLAND',
                           'ocean_proximity_ISLAND', 'ocean_proximity_NEAR BAY',
                           'ocean_proximity_NEAR OCEAN']


class DatasetCreator:
    def __init__(self):
        try:
            model = joblib.load("algo/dataset/model.joblib")
            self.trained_model = model
        except FileNotFoundError:
            self.trained_model = None

        self.initialize()

    def initialize(self):
        if self.trained_model is None:
            start_time = time.time()
            logging.info('--- START training ---')

            self.train_model()

            logging.info("--- END training ---", time.time() - start_time)

    def predict(self, parameters):
        # Create a DataFrame from the input parameters
        df = pd.DataFrame([parameters])

        # Drop any missing values
        df = df.dropna()

        df[ocean_proximity_columns] = 0

        df[ocean_proximity_mapping[parameters['ocean_proximity']]] = 1

        # Reorder the columns to match the feature columns used during training
        df = df.reindex(columns=feature_columns)

        return self.trained_model.predict(df)

    def train_model(self):
        # Here should be the training
        pass
