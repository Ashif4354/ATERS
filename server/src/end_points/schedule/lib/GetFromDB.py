from ....config.mongodb_config import MongoDbConfig
from bson.objectid import ObjectId

def get_from_db(id):
    # print(id)
    db = MongoDbConfig()
    db.connect()
    collection = db.db['Schedules']
    data = collection.find_one({'_id': ObjectId(id)})
    # print(data)
    data['_id'] = str(data['_id'])
    db.disconnect()
    return data