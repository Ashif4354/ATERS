from flask import request
from flask_restful import Resource
from requests import Session

from .lib.GetPlaces import GetPlaces 
from .lib.GoogleGenAI import GoogleGenAI
from ...lib.Exceptions.Exceptions import InvalidPlace
from .lib.SaveInDB import save_in_db
from .lib.Date import generate_days, get_date
from .lib.NotifyDev import notify_dev

class SetSail(Resource):
    def get(self):
        return {'set_sail': 'active'}
    
    def post(self):
        data = request.json
        # print(data, type(data))
        total_days = data['days']
        all_days = generate_days(data['fromDate'], data['toDate'])
        
        with Session() as session:
            
            try:
                notify_dev(session, data)
                GP = GetPlaces(session, data['destination'])
                GGAI = GoogleGenAI(data['destination'])
            except InvalidPlace:
                return {
                    'success': False,
                    'message': 'Invalid Place'
                }
            except Exception as e:
                print(e)
                return {
                    'success': False,
                    'message': 'Something went wrong'
                }
    
            places = GP.get_places(total_days)
            hotels = GP.get_hotels()
            restaurants = GP.get_restaurants()

            places_budget = GGAI.generate_budget_of_places(places[1])
            restaurant_budget = sum([x['price'] for x in restaurants]) / 3
            hotel_budget = sum([x['price'] for x in hotels]) / 3

            total_budget = (int((places_budget + restaurant_budget + hotel_budget) / 100) + 1) * 100

            
            

        schedule = {
            'generatedBy': data['email'],
            'generatedDate': get_date(),
            'destination': data['destination'],
            'from': data['fromDate'],
            'to': data['toDate'],
            'days': data['days'],
            'all_days': all_days,
            'places': places[0],
            'hotels': hotels,
            'restaurants': restaurants,
            'budget': total_budget
        }
        
        id = save_in_db(schedule)

        response = {
            'success': True,
            'id': id
        }

        return response
    







