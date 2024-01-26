import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("firebaseServiceAccountKey.json")
app = firebase_admin.initialize_app(cred)

print(app, type(app), app.name)

user = auth.create_user(
    email='user5@example.com',
    # email_verified=False,
    phone_number='+919566782697',
    password='secretPassword',
    display_name='John Doe',
    # photo_url='http://www.example.com/12345678/photo.png',
    # disabled=False
)
print(user.email, user.uid, user.phone_number, user.display_name)

# print(auth.get_user('ZgmGNWc9PxZZR87akr3GCjvgLbO2').email)