"""
Handles interactions with level data
"""

import json

level_data_json = json.load(open('app/controls/data.json', 'r+'))

def high_score(level, score):
	"""
	Updates the scores in data.json.
	If the provided score is less than stored, then it returns 1 as an indicator of high score
	"""
	if level_data_json['levels']['level' + str(level)]['score'] == -1:
		level_data_json['levels']['level' + str(level)]['score'] = score
		json.dump(level_data_json, open('app/controls/data.json', 'w'))
		return 1
		
	elif level_data_json['levels']['level' + str(level)]['score'] >= score:
		level_data_json['levels']['level' + str(level)]['score'] = score
		json.dump(level_data_json, open('app/controls/data.json', 'w'))
		return 1
		
	else:
		return 0