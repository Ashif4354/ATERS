from ....config.mongodb_config import MongoDbConfig

def get_profile(email):
    mongodb = MongoDbConfig()
    mongodb.connect()
    collection = mongodb.db['UserProfiles']
    profile = collection.find_one({'_id': email})
    mongodb.disconnect()

    if profile:
        profile['schedules'] = profile['schedules'].reverse()
        
        return profile
    else:
        return {
            'success': False,
            'message': 'No profile found'
        }