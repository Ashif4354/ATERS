from pymongo import MongoClient
from os import environ


class MongoDbConfig:
    def __init__(self):
        self.mongodburl = environ["mongo_db_url"]

    def connect(self):
        self.client = MongoClient(self.mongodburl)
        self.db = self.client['Aters']
    
    def disconnect(self):
        self.client.close()

