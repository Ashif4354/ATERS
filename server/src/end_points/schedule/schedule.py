from flask import request
from flask_restful import Resource
from requests import Session

from .lib.GetFromDB import get_from_db

class Schedule(Resource):
    def get(self):
        id = request.args.get('id')

        schedule = get_from_db(id)
        # print(schedule)

        return schedule
    
    def post(self):
        return {'Sorry': 'You cant Post'}