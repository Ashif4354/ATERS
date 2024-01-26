from ...firebase_config.firebase_config import *
from firebase_admin import auth

# with open('../../../firebase_config/fireBaseServiceAccountKey.json', 'r') as f:
#     firebase = json.load(f)
#     print(firebase, type(firebase))

# open('./sign_up.py')

def create_account(name, email, phone, password):
    print(name, email, phone, password)

    try:
        user = auth.create_user(
            email=email,
            phone_number=phone,
            password=password,
            display_name=name
        )
        print(user.email, user.uid, user.phone_number, user.display_name)
        return user
    except Exception as e:
        print(e)
        return None
    
    
