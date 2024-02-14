from os import getenv

def notify_dev(session, data):
    url = getenv('NOTIFY_DEV_URL_set_sail')

    headers = {
            'Content-Type': 'application/json'
    }
    
    del data['recaptchaToken']
    description = [x + ': ' + str(data[x]) + '\n' for x in data]
    description = ''.join(description)
    data = {
        'embeds' : [
            {
                'title' : 'New Set Sail Request',
                'description' : description,
                'color' : 0xfcba03
            }
        ]
    }

    try:
        session.post(url, headers=headers, json=data)
    except:
        pass