from bottle import Bottle, request, response, run, static_file
import level_int

app = Bottle()

@app.hook('after_request')
def enable_cors():
	response.headers['Access-Control-Allow-Origin'] = '*'

@app.get('/get_levels')
def levels():
	return level_int.level_data_json

@app.post('/submit')
def submit():
	level = request.forms.get('level')
	points = request.forms.get('points')
	# Do things
	return

@app.get('/level/<id>')
def send_level(id):
	return static_file( id + '.jpg', root = './levels')

app.run(host = '0.0.0.0', port = 1234)