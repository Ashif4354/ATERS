from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS

from .end_points.default.default import Default
from .end_points.sign_up.sign_up import SignUp
from .end_points.set_sail.set_sail import SetSail

from .lib.grecaptcha.verify_recaptcha import verify_recaptcha

app = Flask(__name__)
api = Api(app)
CORS(app)
    
api.add_resource(Default, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(SetSail, '/setsail')

@app.before_request
def before_request():
    print('before_request')
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
    print('before_request end')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)