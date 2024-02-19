from datetime import datetime, timedelta

def generate_days(from_, to_):
    from_ = datetime.strptime(from_, '%d-%m-%Y')
    to_ = datetime.strptime(to_, '%d-%m-%Y')

    days = (to_ - from_).days
    all_days = [from_ + timedelta(days=i) for i in range(days+1)]
    all_days = [day.strftime('%d-%m-%Y') for day in all_days]

    return all_days

def get_date():
    return datetime.now().strftime('%d-%m-%Y %H:%M:%S')

if __name__ == '__main__':
    # generate_days('01-01-2021', '05-01-2021')
    print(get_date())
