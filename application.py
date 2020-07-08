from flask import Flask
from flask import url_for, request, session, redirect

import logging
from datetime import datetime
from random import randint
import requests
import json
from pprint import pprint
import os

application = Flask(__name__, static_folder='simple-react/build', static_url_path='/')

# set a 'SECRET_KEY' to enable the Flask session cookies
application.secret_key = 'random development key'

FACEBOOK_APP_ID = os.getenv("FACEBOOK_APP_ID")
FACEBOOK_APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")

@application.route('/api/v1/auth/facebook')
def auth_facebook():
    return application.send_static_file('index.html')

@application.route('/api/time')
def get_current_time():
    now = datetime.now() # current date and time

    return {'datetime': '{}'.format(now.strftime("%m/%d/%Y, %H:%M:%S"))}

@application.route('/random/number')
def generate_random_number():
    random_number = randint(0,100)
    return {'random_number': '{}'.format(random_number)}

@application.route('/random/string')
def generate_random_string():
    str_list = ['first','second','third']
    position=randint(0,len(str_list)-1)
    random_string = str_list[position]
    return {'random_string': random_string}

@application.route('/random/quote')
def generate_random_quote():
    quotes = [{'random_quote': 'Yeah we all shine on, like the moon, and the stars, and the sun.', 'quote_author': 'John Lennon'}, {'random_quote': 'I begin with an idea and then it becomes something else.', 'quote_author': 'Pablo Picasso'}, {'random_quote': 'Things do not change. We change.', 'quote_author': 'Henry David Thoreau'}, {'random_quote': 'If you take each challenge one step at a time, with faith in every footstep, your strength and understanding will increase.', 'quote_author': 'James Faust'}, {'random_quote': 'All I can say about life is, Oh God, enjoy it!', 'quote_author':'Bob Newhart'}, {'random_quote': 'A day of worry is more exhausting than a day of work.', 'quote_author':'John Lubbock'}]
    #print(quotes)
    #quote_api_endpoint = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?'
    #quote_api_endpoint = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    #response = requests.get(quote_api_endpoint)
    #pprint(response)
    #if response.ok:
    #    data = json.loads(response.content)
    #    print(data)
    #quote = response.json()['quoteText']
    #author = response.json()['quoteAuthor']
    #return {'random_quote': quote, 'quote_author': author}
    position=randint(0,len(quotes)-1)
    random_quote = quotes[position]
    #print(random_quote)
    #quote=random_quote['random_quote']
    #author=random_quote['quote_author']
    return random_quote


@application.route('/')
def index():
    logging.warning('hello')
    return application.send_static_file('index.html')

#
# Mainline
#
if __name__ == '__main__':
    application.debug = False
    application.run()
