from ....config.mongodb_config import MongoDbConfig

def save_in_db(data):
    # print(data)
    db = MongoDbConfig()
    db.connect()
    collection = db.db['Schedules']
    id = collection.insert_one(data)
    # print(data)
    db.disconnect()
    if id.acknowledged:
        # print(data)
        add_schedule_in_profile(id.inserted_id, data)
        # print(data)
        return str(id.inserted_id)
    # print(id, id.inserted_id, type(id.inserted_id), str(id.inserted_id), type(str(id.inserted_id)) )

def add_schedule_in_profile(id, schedule):
    # print(schedule)
    email = schedule['generatedBy']
    schedule['randomImage'] = schedule['places']['day1'][0]['images'][0]
    try:
        del schedule['generatedBy']
        del schedule['all_days']
        del schedule['places']
        del schedule['hotels']
        del schedule['restaurants']
        del schedule['budget']
    except:
        pass
    # print(schedule)
    schedule['_id'] = str(schedule['_id'])
    db = MongoDbConfig()
    db.connect()
    collection = db.db['UserProfiles']

    collection.update_one(
        {'_id': email},
        {'$push': {'schedules': schedule}}
    )
    db.disconnect()
    

if __name__ == "__main__":
    data = {
        'createdBy': 'Ashif'
    }

    print(save_in_db(data))