from bottle import Bottle, request, response, run, static_file
import level_int
import score_calculator

data = level_int.level_data_json

app = Bottle()

def enable_cors(fn):
	def _enable_cors(*args, **kwargs):
		response.headers['Access-Control-Allow-Origin'] = '*'
		response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
		response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested_With, X-CSRF-Token'
		if request.method != 'OPTIONS':
			return fn(*args, **kwargs)
	return _enable_cors

@app.get('/get_levels')
@enable_cors
def levels():
	return data

@app.post('/submit')
@enable_cors
def submit():
	level = request.forms.get('level')
	points = request.forms.get('points')
	points = points.split(" ")
	score = score_calculator.findScore(level, points)

	high = level_int.highScore(level, score)

	return score + " " + str(high)

@app.get('/level/<id>')
@enable_cors
def send_level(id):
	return static_file( id + '.jpg', root = './levels')

app.run(host = '0.0.0.0', port = 1234)