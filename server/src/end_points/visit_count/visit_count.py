from flask import request
from flask_restful import Resource

from ...config.mongodb_config import MongoDbConfig


class VisitCount(Resource):
    def get(self):
        return {'visit_count': 'active'}

    def post(self):
        mongodb = MongoDbConfig()
        mongodb.connect()
        collection = mongodb.db['VisitCount']
        try: 
            visit_count = collection.find_one({'_id': 'visitCount'})
            return {'visitCount': visit_count['visitCount'] + 1}
        except:
            return {'visitCount': 1}
        finally:
            collection.update_one({'_id': 'visitCount'}, {'$inc': {'visitCount': 1}})
            mongodb.disconnect()