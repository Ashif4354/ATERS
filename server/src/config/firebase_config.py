import firebase_admin
from firebase_admin import credentials
from os import environ

firebase_service_account_key = {
  "type": "service_account",
  "project_id": environ['firebase_project_id'],
  "private_key_id": environ['firebase_private_key_id'],
  "private_key": environ['firebase_private_key'].replace('\\n', '\n'),
  "client_email": environ['firebase_client_email'],
  "client_id": environ['firebase_client_id'],
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": environ['firebase_client_x509_cert_url'],
  "universe_domain": "googleapis.com"
}

cred = credentials.Certificate(firebase_service_account_key)
app = firebase_admin.initialize_app(cred)