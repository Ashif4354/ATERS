from requests import Session
from os import environ

def verify_recaptcha(token):
    with Session() as session:
        url = "https://www.google.com/recaptcha/api/siteverify"

        data = {
            'secret': environ['6LeR6l0pAAAAAJPrrnPaLm1PZk6fZfjyIoOCmGdg'],
            'response': token
        }

        print(data)

        headers = {
            'Content-Type': 'application/json'
        }

        response = session.post(url, data=data)
        print(response.json())
        return response.json()['success']



