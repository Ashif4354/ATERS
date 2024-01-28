from os import environ, getcwd
from dotenv import load_dotenv

load_dotenv()
environ['fireBaseServiceAccountKeyJSON'] = getcwd() + '\\src\\firebase_config\\fireBaseServiceAccountKey.json'

from .Flask_App import app

