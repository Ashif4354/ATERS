import firebase_admin
from firebase_admin import credentials
from os import getenv

# cred = credentials.Certificate(getenv('fireBaseServiceAccountKeyJSON'))
cred = credentials.Certificate('fireBaseServiceAccountKey.json')
app = firebase_admin.initialize_app(cred)