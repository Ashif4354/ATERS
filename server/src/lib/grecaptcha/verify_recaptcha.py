from requests import Session
from os import environ

def verify_recaptcha(token, api_key):
    with Session() as session:
        url = "https://www.google.com/recaptcha/api/siteverify"

        data = {
            'secret': api_key,
            'response': token
        }

        # print(data)

        response = session.post(url, data=data)
        # print(response.json())
        return response.json()['success']

