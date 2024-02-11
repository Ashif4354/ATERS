from ....config.mongodb_config import MongoDbConfig

# from pymongo import MongoClient
# from os import environ


# class MongoDbConfig:
#     def __init__(self):
#         self.mongodburl = environ["mongo_db_url"]

#     def connect(self):
#         self.client = MongoClient(self.mongodburl)
#         self.db = self.client['Aters']
    
#     def disconnect(self):
#         self.client.close()

def save_in_db(data):
    db = MongoDbConfig()
    db.connect()
    collection = db.db['Schedules']
    id = collection.insert_one(data)
    db.disconnect()
    if id.acknowledged:
        return str(id.inserted_id)
    # print(id, id.inserted_id, type(id.inserted_id), str(id.inserted_id), type(str(id.inserted_id)) )
    

if __name__ == "__main__":
    data = {
        'createdBy': 'Ashif'
    }

    print(save_in_db(data))