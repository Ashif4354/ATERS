from flask import request
from flask_restful import Resource
from requests import Session

from .lib.GetPlaces import GetPlaces 
from ...lib.Exceptions.Exceptions import InvalidPlace

class SetSail(Resource):
    def get(self):
        return {'set_sail': 'active'}
    
    def post(self):
        data = request.json
        # print(data, type(data))
        total_days = data['days']
        
        with Session() as session:
            try:
                GP = GetPlaces(session, data['destination'])
            except InvalidPlace:
                return {
                    'success': False,
                    'message': 'Invalid Place'
                }
            places = GP.get_places(total_days)
            hotels = GP.get_hotels()
            restaurants = GP.get_restaurants()


        response = {
            'success': True,
            'places': places,
            'hotels': hotels,
            'restaurants': restaurants
        }

        return response
    







