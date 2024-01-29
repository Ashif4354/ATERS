from flask import request
from flask_restful import Resource
from requests import Session

from .lib.GetPlaces import GetPlaces 

class SetSail(Resource):
    def get(self):
        return {'set_sail': 'active'}
    
    def post(self):
        data = request.json
        # print(data, type(data))
        total_days = data['days']
        
        
        
        with Session() as session:
            GP = GetPlaces(session, data['destination'])
            places = GP.get_places(total_days)
            hotels = GP.get_hotels()
            restaurants = GP.get_restaurants()


        response = {
            'places': places,
            'hotels': hotels,
            'restaurants': restaurants
        }

        return response
    







