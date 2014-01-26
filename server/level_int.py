import json

level_data_json = json.load(open('data.json', 'r+'))

def highScore(level, score):
	if level_data_json['levels']['level' + level]['score'] <= score:
		level_data_json['levels']['level' + level]['score'] = score
		json.dump(level_data_json, open('data.json', 'w'))
		return 1
	else:
		return 0