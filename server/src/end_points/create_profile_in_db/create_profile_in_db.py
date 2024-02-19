from flask import request
from flask_restful import Resource

from .lib.create_profile import create_profile

class CreateProfileInDB(Resource):
    def post(self):
        data = request.json
        create_profile(data)
        return {'profileCreated': True}

    def get(self):
        return {'createProfile': 'working'}

