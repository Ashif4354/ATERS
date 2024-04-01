from os import getenv
from json import loads
from random import choice
import google.generativeai as genai

class GoogleGenAI:
    def __init__(self, destination):
        self.destination = destination
        genai.configure(api_key = getenv('ATERS_GCP_API_KEY'))
        generation_config = {
            'temperature': 1,
            'top_p': 1,
            'top_k' : 1,
            'max_output_tokens': 12345
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]

        self.model = genai.GenerativeModel(
            model_name = 'gemini-1.0-pro', 
            generation_config = generation_config, # type: ignore
            # safety_settings=safety_settings
        )  

    def generate_from_prompt(self, prompt):
        return self.model.generate_content(prompt)
    

    def generate_budget_of_places(self, places):
        prompt = [
            f'Below are the places I am planning to visit in {self.destination}',
            str(places),
            'Generate me the exact expense of entry fee for each place',
            'I want it in JSON format',
            """
            {
                place: expense,
                place: expense,
                place: expense
            }
            """,
            'Dont omit any place and give the response for all the places mentioned above',
            'The price should be compulsorily a numeric values only and dont include the currency symbol(₹) or any other words',
            'Dont give separate prices for adult and children, just add both adult and children price and give the response as a single price for the place',

        ]

        response = self.generate_from_prompt(prompt)
        response = response.text.strip('`')
        try:
            response = loads(response)
            total_price = sum([response[x] for x in response])

            return total_price
        except:
            return choice([1000, 1500, 2000, 2500, 3000, 3500, 4000])


        


if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    # GGAI = GoogleGenAI('Chennai')
    # print(GGAI.generate_budget_of_places(['besant nagar beach', 'vgp universal kingdom', 'vgp marine kingdom',]))
    # genai.configure(api_key = getenv('ATERS_GCP_API_KEY'))

    # print(genai.get_model('models/gemini-pro', client=None))

    # response = genai.list_models(
    #     page_size= 50,
    #     client= None
    # )
    # print(response)

    for model in genai.list_models():
        print(model)