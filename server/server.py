from bottle import Bottle, request, response, run, static_file

app = Bottle()

@app.hook('after_request')
def enable_cors():
	response.headers['Access-Control-Allow-Origin'] = '*'
	response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
	response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.get('/getlevels')
def levels():
	return # Json of levels

@app.post('/submit')
def submit():
	level = request.forms.get('level')
	points = request.forms.get('points')
	# Do tasks
	return # Json of score

@app.get('/level/<id>')
def send_level(id):
	return static_file( id + '.png', root = './levels')

app.run(host = '0.0.0.0', port = 1234)