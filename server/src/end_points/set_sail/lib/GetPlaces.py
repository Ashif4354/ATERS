from os import environ
from json import dump
class GetPlaces:
    def __init__(self, session, place):
        self.session = session
        self.place = place

    def get_places(self, days):

        self.coords = self.get_coords()

        url = 'https://places.googleapis.com/v1/places:searchNearby'

        headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': environ['g_maps_api_key'],
            'X-Goog-FieldMask': '*'
        }

        data = {
            'includedTypes': [
                'amusement_center',
                'amusement_park',
                'aquarium',
                # 'banquet_hall',
                'bowling_alley',
                'casino',
                # 'community_center',
                # 'convention_center',
                # 'cultural_center',
                # 'dog_park',
                # 'event_venue',
                'hiking_area',
                'historical_landmark',
                'marina',
                # 'movie_rental',
                # 'movie_theater',
                'national_park',
                'night_club',
                'park',
                'tourist_attraction',
                'visitor_center',
                # 'wedding_venue',
                'zoo'],
            'maxResultCount': 20,
            'locationRestriction': {
                'circle': {
                    'center': self.coords,
                    'radius': 10000 
                }
            }
        }

        
        r = self.session.post(url, headers=headers, json=data)
        # print(r.json())
        places = r.json()['places']
            
            
        places.sort(key=lambda x: x['userRatingCount'], reverse=True)

        for place in places:
            print(place['displayName']['text'])

        response = {}

        for i in range(days):
            day = 'day{}'.format(i+1)
            response[day] = []

            for j in range(3):
                place = {}

                place['name'] = places[i*3+j]['displayName']['text']
                try:
                    place['description'] = places[i*3+j]['editorialSummary']['text']
                except KeyError:
                    place['description'] = places[i*3+j]['formattedAddress']

                place['gmaps_url'] = places[i*3+j]['googleMapsUri']
                
                photo_names = []
                for k in range(1):
                # for k in range(len(places[i]['photos'])):
                    photo_names.append(places[i*3+j]['photos'][k]['name'])
                place['images'] = self.get_photo_uris(photo_names)
            
                response[day].append(place)
            

        return response

    def get_hotels(self):
        url = 'https://places.googleapis.com/v1/places:searchNearby'

        headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': environ['g_maps_api_key'],
            'X-Goog-FieldMask': '*'
        }

        data = {
            'includedTypes': [
                # 'tourist_attraction',
                'bed_and_breakfast',
                # 'campground',
                'camping_cabin',
                'cottage',
                'extended_stay_hotel',
                'farmstay',
                'guest_house',
                # 'hostel',
                'lodging',
                'motel',
                'private_guest_room',
                'resort_hotel',
                'rv_park',
            ],
            'maxResultCount': 20,
            'locationRestriction': {
                'circle': {
                    'center': self.coords,
                    'radius': 10000
                }
            }
        }

        response = self.session.post(url, headers=headers, json=data)
        # print(response.json())
        # with open('hotels.json', 'w') as f:
        #     dump(response.json(), f, indent=4)

        places = response.json()['places']

        places.sort(key=lambda x: x['userRatingCount'], reverse=True)

        places = places[:3]

        response = []

        for place in places:
            place_ = {}

            place_['name'] = place['displayName']['text']
            try:
                place_['description'] = place['editorialSummary']['text']
            except KeyError:
                place_['description'] = place['formattedAddress']

            place_['gmaps_url'] = place['googleMapsUri']
            place_['rating'] = place['rating']
             
            photo_names = []
            for k in range(1):
            # for k in range(len(places[i]['photos'])):
                photo_names.append(place['photos'][k]['name'])
            place_['images'] = self.get_photo_uris(photo_names)

            response.append(place_)

        return response
    
    def get_restaurants(self):
        url = 'https://places.googleapis.com/v1/places:searchNearby'

        headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': environ['g_maps_api_key'],
            'X-Goog-FieldMask': '*'
        }

        data = {
            'includedTypes': [
                'american_restaurant',
                # 'bakery',
                'barbecue_restaurant',
                'brazilian_restaurant',
                'breakfast_restaurant',
                'brunch_restaurant',
                # 'cafe',
                'chinese_restaurant',
                # 'coffee_shop',
                'fast_food_restaurant',
                'french_restaurant',
                'greek_restaurant',
                'hamburger_restaurant',
                # 'ice_cream_shop',
                'indian_restaurant',
                'indonesian_restaurant',
                'italian_restaurant',
                'japanese_restaurant',
                'korean_restaurant'	,
                'lebanese_restaurant',
                # 'meal_delivery',
                # 'meal_takeaway',
                'mediterranean_restaurant',
                'mexican_restaurant',
                'middle_eastern_restaurant',
                'pizza_restaurant',
                'ramen_restaurant',
                'restaurant',
                # 'sandwich_shop',
                'seafood_restaurant',
                'spanish_restaurant',
                'steak_house',
                'sushi_restaurant',
                'thai_restaurant',
                'turkish_restaurant',
                'vegetarian_restaurant',
                'vietnamese_restaurant',
            ],
            'maxResultCount': 20,
            'locationRestriction': {
                'circle': {
                    'center': self.coords,
                    'radius': 10000
                }
            }
        }

        response = self.session.post(url, headers=headers, json=data)
        # print(response.json())
        with open('hotels.json', 'w') as f:
            dump(response.json(), f, indent=4)

        places = response.json()['places']

        places.sort(key=lambda x: x['userRatingCount'], reverse=True)

        places = places[:3]

        response = []

        for place in places:
            place_ = {}

            place_['name'] = place['displayName']['text']
            try:
                place_['description'] = place['editorialSummary']['text']
            except KeyError:
                place_['description'] = place['formattedAddress']

            place_['gmaps_url'] = place['googleMapsUri']
            place_['rating'] = place['rating']
             
            photo_names = []
            for k in range(1):
            # for k in range(len(places[i]['photos'])):
                photo_names.append(place['photos'][k]['name'])
            place_['images'] = self.get_photo_uris(photo_names)

            response.append(place_)

        return response

    

        
        

        






        


        

        

        


    def get_coords(self):
        url = 'https://maps.googleapis.com/maps/api/geocode/json'

        params = {
            'address': self.place,
            'key': environ['g_maps_api_key']
        }

        response = self.session.get(url, params=params)
        response = response.json()

        coords = {
            'latitude':response['results'][0]['geometry']['location']['lat'],
            'longitude':response['results'][0]['geometry']['location']['lng']
        }
        
        return coords

    def get_photo_uris(self, names):
        uris = []
        for name in names:
            url = 'https://places.googleapis.com/v1/{}/media'.format(name)

            params = {
                'key' : environ['g_maps_api_key'],
                'maxHeightPx': 480,
                'skipHttpRedirect': True
            }

            uris.append(self.session.get(url, params=params).json()['photoUri'])

        return uris

            

    