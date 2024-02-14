from requests import Session
from os import environ

def verify_recaptcha(token):
    with Session() as session:
        url = "https://www.google.com/recaptcha/api/siteverify"

        data = {
            'secret': environ['g_recaptcha_secret_key'],
            'response': token
        }

        # print(data)

        response = session.post(url, data=data)
        # print(response.json())
        return response.json()['success']



def verify_recaptcha_invisible(token):
    with Session() as session:
        url = "https://www.google.com/recaptcha/api/siteverify"

        data = {
            'secret': environ['g_recaptcha_invisible_secret_key'],
            'response': token
        }

        response = session.post(url, data=data)
        return response.json()['success']