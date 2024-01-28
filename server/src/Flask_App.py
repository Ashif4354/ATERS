from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from .end_points.default.default import Default
from .end_points.sign_up.sign_up import SignUp
from .end_points.set_sail.set_sail import SetSail

app = Flask(__name__)
api = Api(app)
CORS(app)
    
api.add_resource(Default, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(SetSail, '/setsail')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)