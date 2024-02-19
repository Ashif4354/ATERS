from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS
from os import environ

from .end_points.default.default import Default
from .end_points.sign_up.sign_up import SignUp
from .end_points.set_sail.set_sail import SetSail
from .end_points.schedule.schedule import Schedule
from .end_points.create_profile_in_db.create_profile_in_db import CreateProfileInDB
from .end_points.user_profile.user_profile import UserProfile

from .lib.grecaptcha.verify_recaptcha import verify_recaptcha

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.before_request
def before_request():
    # print(request.path)
    if request.method == 'POST': 
        if 'recaptchaToken' in request.json:
            recaptcha_token = request.json['recaptchaToken']
            if not verify_recaptcha(recaptcha_token, environ['g_recaptcha_secret_key']):
                return jsonify({
                    'success': False,
                    'message': 'Recaptcha failed',
                })
            
        elif 'invisibleRecaptchaToken' in request.json:
            recaptcha_token = request.json['invisibleRecaptchaToken']
            if not verify_recaptcha(recaptcha_token, environ['g_recaptcha_invisible_secret_key']):
                return jsonify({
                    'success': False,
                    'message': 'Recaptcha failed',
                })
        else:
            return jsonify({
                'success': False,
                'message': 'Recaptcha token not found',
            })
        

    # elif request.method == 'GET' and request.path in ('/schedule',):
    #     recaptcha_token = request.args.get('invisibleRecaptchaToken')

    #     if recaptcha_token:
    #         if not verify_recaptcha(recaptcha_token, environ['g_recaptcha_invisible_secret_key']):
    #             return jsonify({
    #                 'success': False,
    #                 'message': 'Recaptcha failed',
    #             })
            
    #     else:
    #         return jsonify({
    #             'success': False,
    #             'message': 'Recaptcha token not found',
    #         })

            

api.add_resource(Default, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(SetSail, '/setsail')
api.add_resource(Schedule, '/schedule')
api.add_resource(CreateProfileInDB, '/createprofileindb')
api.add_resource(UserProfile, '/userprofile')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)