from os import environ
from json import dump

from ....lib.Exceptions.Exceptions import InvalidPlace

class GetPlaces:
    def __init__(self, session, place):
        self.session = session
        self.place = place
        self.coords = self.get_coords()

        if self.coords is None:
            raise InvalidPlace('Invalid Place')

    def fetch_places_from_maps(self, data, type):
        url = 'https://places.googleapis.com/v1/places:searchNearby'

        headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': environ['g_maps_api_key'],
            'X-Goog-FieldMask': '*'
        }

        data = {
            'locationRestriction': {
                'circle': {
                    'center': self.coords,
                    'radius': 20000 
                }
            },
            **data
        }


        r = self.session.post(url, headers=headers, json=data)
        # print(r.json())
        try:
            places = r.json()['places']
        except KeyError:
            print(r.json())
            return
        # print(f'TOTAL {type}: ', len(places))
        with open(f'output_json_files/{type}.json', 'w') as f:
            dump(r.json(), f, indent=4)
            
        for place in places:
            if 'userRatingCount' not in place:
                place['userRatingCount'] = 0
            if 'rating' not in place:
                place['rating'] = 1
            if 'googleMapsUri' not in place:
                place['googleMapsUri'] = 'https://www.google.com/maps/search/?api=1&query={}'.format(place['displayName']['text'])
            if 'photos' not in place:
                place['photos'] = []
            
        
        places.sort(key=lambda x: x['userRatingCount'], reverse=True)

        # for place in places:
        #     print(place['displayName']['text'])

        return places

    def get_places(self, days):  
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
        }
        places = self.fetch_places_from_maps(data, 'places')
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
                except:
                    place['description'] = 'No Description/Address available'

                place['gmaps_url'] = places[i*3+j]['googleMapsUri']
                
                photo_names = []
                for k in range(1):
                # for k in range(len(places[i]['photos'])):
                    try:
                        photo_names.append(places[i*3+j]['photos'][k]['name'])
                    except IndexError:
                        pass
                place['images'] = self.get_photo_uris(photo_names)
            
                response[day].append(place)
            

        return response

    def get_hotels(self):

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
            'maxResultCount': 20
        }

        places = self.fetch_places_from_maps(data, 'hotels')
        places = places[:3]

        response = []

        for place in places:
            place_ = {}

            place_['name'] = place['displayName']['text']
            try:
                place_['description'] = place['editorialSummary']['text']
            except KeyError:
                place_['description'] = place['formattedAddress']
            except:
                place['description'] = 'No Description/Address available'

            place_['gmaps_url'] = place['googleMapsUri']
            place_['rating'] = place['rating']
             
            photo_names = []
            for k in range(1):
            # for k in range(len(places[i]['photos'])):
                try:
                    photo_names.append(place['photos'][k]['name'])
                except IndexError:
                    pass
            place_['images'] = self.get_photo_uris(photo_names)

            response.append(place_)

        return response
    
    def get_restaurants(self):

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
            'maxResultCount': 20
        }

        places = self.fetch_places_from_maps(data, 'restaurants')
        places = places[:3]

        response = []

        for place in places:
            place_ = {}

            place_['name'] = place['displayName']['text']
            try:
                place_['description'] = place['editorialSummary']['text']
            except KeyError:
                place_['description'] = place['formattedAddress']
            except:
                place['description'] = 'No Description/Address available'

            place_['gmaps_url'] = place['googleMapsUri']
            place_['rating'] = place['rating']
             
            photo_names = []
            for k in range(1):
            # for k in range(len(places[i]['photos'])):
                try:
                    photo_names.append(place['photos'][k]['name'])
                except IndexError:
                    pass
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
        
        try:

            coords = {
                'latitude':response['results'][0]['geometry']['location']['lat'],
                'longitude':response['results'][0]['geometry']['location']['lng']
            }
            return coords
        
        except IndexError:
            return None      

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

            

    