from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS

from .end_points.default.default import Default
from .end_points.sign_up.sign_up import SignUp
from .end_points.set_sail.set_sail import SetSail
from .end_points.schedule.schedule import Schedule

from .lib.grecaptcha.verify_recaptcha import verify_recaptcha, verify_recaptcha_invisible

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.before_request
def before_request():
    if request.method == 'POST': 
        if 'recaptchaToken' in request.json and request.json['recaptchaToken'] != '':
            recaptcha_token = request.json['recaptchaToken']
            if not verify_recaptcha(recaptcha_token):
                return jsonify({
                    'success': False,
                    'message': 'Recaptcha failed',
                })
        else:
            return jsonify({
                'success': False,
                'message': 'Recaptcha token not found',
            })
        

    # elif request.method == 'GET':
    #     recaptcha_token = request.args.get('recaptchaToken')

    #     if recaptcha_token:
    #         if not verify_recaptcha_invisible(recaptcha_token):
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)