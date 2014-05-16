"""
Contains code for score calculation and other tasks to be excuted on images
"""

from cv2 import imread, line, bitwise_and
import numpy as np

def find_mean_color(img, on_pixels = -1):
	"""
	Returns mean color of an image (in B, G, R).
	If on_pixels are provided (non negative), then the total color is divided by this value instead of total pixels in image. This is used for calculating color of a path.
	"""

	if on_pixels == -1:
		pixels = img.shape[0] * img.shape[1]
	else:
		pixels = on_pixels
	mean_blue = int(np.sum(img[:, :, 0]) / pixels)
	mean_green = int(np.sum(img[:, :, 1]) / pixels)
	mean_red = int(np.sum(img[:, :, 2])/ pixels)
	return (mean_blue, mean_green, mean_red)

def make_mask(points_array, shape = (400, 600, 3)):
	"""
	Returns the mask made by using the points provided from the player.
	The mask consists of lines drawn by the player and is used for calculating the score.
	Also returns the number of "on" pixels (pixels with white color)
	"""
	
	number_of_points = len(points_array)
	mask = np.zeros(shape)
	for i in range(number_of_points - 1):
		line(mask, points_array[i], points_array[i+1], (255, 255, 255), 20)

	total_white_color = np.sum(mask[:, :, 0])
	total_on_pixels = int(total_white_color / 255.0)

	return mask, total_on_pixels

def find_score(level_id, points):
	"""
	Calculates the score by taking the level_id and points.
	"""

	fileref = "app/controls/levels/" + str(level_id) + ".jpg"
	level_img = imread(fileref)
	mask, on_pixels = make_mask(points, shape = level_img.shape)
	
	mask = np.array(mask, dtype = np.uint8)
	result = bitwise_and(level_img, mask)

	level_mean = find_mean_color(level_img)
	solution_mean = find_mean_color(result, on_pixels = on_pixels)
	score = 0.0
	for x in range(3):
		score += (level_mean[x] - solution_mean[x]) ** 2

	score = int(np.sqrt(score))
	print "score is : " + str(score)

	return score