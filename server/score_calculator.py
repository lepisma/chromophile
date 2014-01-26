import cv2
import numpy as np
from PIL import Image, ImageDraw
import math

def findMeanColor(img):
	pixels = img.shape[0] * img.shape[1]
	meanBlue = int(np.sum(img[:, :, 0]) / pixels)
	meanGreen = int(np.sum(img[:, :, 1]) / pixels)
	meanRed = int(np.sum(img[:, :, 2])/ pixels)
	return (meanBlue, meanGreen, meanRed)

def makeMask(points):
	mask = Image.open("mask.jpg")
	draw = ImageDraw.Draw(mask)
	draw.line((points[0], points[1], points[2], points[3]), fill = (255, 255, 255), width = 20)
	draw.line((points[4], points[5], points[6], points[7]), fill = (255, 255, 255), width = 20)
	draw.line((points[8], points[9], points[10], points[11]), fill = (255, 255, 255), width = 20)
	draw.line((points[12], points[13], points[14], points[15]), fill = (255, 255, 255), width = 20)
	im.save("tmp.jpg")

def findScore(level_id, points, dominant_color):
	fileref = "./levels/" + str(level_id) + ".jpg"
	
	makeMask(points)

	img = cv2.imread(fileref)
	mask = cv2.imread("tmp.jpg")
	result = cv2.bitwise_and(img, img, mask = mask)

	levelMean = findMeanColor(img)
	solutionMean = findMeanColor(result)
	scoreInv = 0
	for x in range(3):
		scoreInv += (levelMean[x] - solutionMean[x])**2

	scoreInv = math.sqrt(scoreInv)
	score = 500.0 - scoreInv

	return score