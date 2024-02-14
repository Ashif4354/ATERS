from flask import request
from flask_restful import Resource

class Default(Resource):
    def get(self):
        # all_headers = request.headers
        # print("headers", all_headers)
        # for header in all_headers:
        #     print(header, ":", all_headers[header])

        return {'Server': 'Running and ready to go!'}