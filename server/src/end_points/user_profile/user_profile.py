from flask import request
from flask_restful import Resource

from .lib.get_profile import get_profile

class UserProfile(Resource):
    def get(self):
        return {'user_profile': 'active'}
    
    def post(self):
        data = request.json

        return get_profile(data['email'])
