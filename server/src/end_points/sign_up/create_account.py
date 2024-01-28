from ...firebase_config.firebase_config import *
from firebase_admin import auth

# with open('../../../firebase_config/fireBaseServiceAccountKey.json', 'r') as f:
#     firebase = json.load(f)
#     print(firebase, type(firebase))

# open('./sign_up.py')

def create_account(name, email, password):
    print(name, email, password)

    try:
        user = auth.create_user(
            email=email,
            password=password,
            display_name=name
        )
        print(user.email, user.uid, user.display_name)

        return {
            'email': user.email,
            'name': user.display_name
        }
    
    except Exception as e:
        print(e)
        return None
    
    
