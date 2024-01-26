from flask import request
from flask_restful import Resource

from .create_account import create_account

class SignUp(Resource):
    def get(self):
        return {'sign_up': 'active'}
    
    def post(self):
        user_data = request.json
        print(user_data, type(user_data))
        created_user = create_account(user_data['name'], user_data['email'], user_data['phone'], user_data['password'])

        print(created_user, type(created_user))

        return {'sign_up': 'in progress'}