"""
Code for interacting with client requests
"""

from bottle import Bottle, request, response, run, template, static_file
from app.controls.level_int import *
import app.controls.score_calculator as sc

data = level_data_json

app = Bottle()

@app.hook('after_request')
def enable_cors():
	response.headers['Access-Control-Allow-Origin'] = '*'

@app.get('/')
def homepage():
	"""
	Returns the homepage
	"""
	
	return template("app/index")

@app.get('/get_levels')
def levels():
	"""
	Returns the level data to the client
	"""
	
	return data

@app.post('/submit')
def submit():
	"""
	Handles the points submission
	"""
	
	level = int(request.forms.get('level'))
	points = request.forms.get('points')
	points = points.split(" ")
	points_array = []
	for point in points:
		pos = point.split(",")
		points_array.append((int(pos[0]), int(pos[1])))
	score = sc.find_score(level, points_array)

	high = high_score(level, score)

	return str(score) + " " + str(high)

@app.get('/level/<id>')
def send_level(id):
	"""
	Sends the level images
	"""
	return static_file( id + '.jpg', root = 'app/controls/levels')

@app.get('<path:path>')
def server_public(path):
	"""
	Static file rendering
	"""
	return static_file(path, root = 'public/')


app.run(host = '0.0.0.0', port = 1234)