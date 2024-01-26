from flask import Flask
from flask_restful import Api
from os import environ, getcwd

environ['fireBaseServiceAccountKeyJSON'] = getcwd() + '\\src\\firebase_config\\fireBaseServiceAccountKey.json'

from .end_points.default.default import Default
from .end_points.sign_up.sign_up import SignUp

app = Flask(__name__)
api = Api(app)
    
api.add_resource(Default, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(SetSail, '/setsail')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

