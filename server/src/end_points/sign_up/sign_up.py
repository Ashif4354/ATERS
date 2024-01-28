from flask import request
from flask_restful import Resource
from requests import Session

from .create_account import create_account
from ...lib.grecaptcha.verify_recaptcha import verify_recaptcha

class SignUp(Resource):
    def get(self):
        return {'sign_up': 'active'}
    
    def post(self):
        user_data = request.json
        print(user_data, type(user_data))

        recaptcha_token = user_data['recaptchaToken']
        
        if not verify_recaptcha(recaptcha_token):
            return {'error': 'recaptcha failed'}
        
        else:
            created_user = create_account(user_data['name'], user_data['email'], user_data['password'])

            print(created_user, type(created_user))

            return created_user