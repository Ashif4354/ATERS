from ...config.firebase_config import *
from firebase_admin import auth

from ...end_points.create_profile_in_db.lib.create_profile import create_profile

# with open('../../../firebase_config/fireBaseServiceAccountKey.json', 'r') as f:
#     firebase = json.load(f)
#     print(firebase, type(firebase))

# open('./sign_up.py')

def create_account(name, email, password):
    # print(name, email, password)

    try:
        user = auth.create_user(
            email=email,
            password=password,
            display_name=name
        )
        # print(user.email, user.uid, user.display_name)
        create_profile({'name': user.display_name, 'email': user.email})
        

        return {
            'success': True,
            'email': user.email,
            'name': user.display_name,
            'photoURL': user.photo_url,
        }
    
    except Exception as e:
        print(e)
        return {
            'success': False,
            'message': str(e),
        }
    
    
