from ....config.mongodb_config import MongoDbConfig

def create_profile(user):
    user_name = user['name']
    user_email = user['email']

    profile = {
        '_id': user_email,
        'name': user_name,
        'schedules': []
    }

    save_in_db(profile)


def save_in_db(profile):
    db = MongoDbConfig()
    db.connect()
    collection = db.db['UserProfiles']
    collection.insert_one(profile)
    db.disconnect()