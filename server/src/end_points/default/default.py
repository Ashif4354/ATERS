from flask_restful import Resource

class Default(Resource):
    def get(self):
        return {'Server': 'Running and ready to go!'}