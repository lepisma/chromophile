import cv2
import numpy as np

def parsePoints(webPoints):
	return # Points for cv use

def findScore(level_id, points, dominant_color):
	fileref = "./levels/" + str(level_id) + ".jpg"
	mask = cv2.imread("mask.jpg")
	mask = cv2.line(mask, (10, (mask.shape[0] - 10)), (points[0]), (255, 255, 255), 20)
	mask = cv2.line(mask, points[0], points[1], (255, 255, 255), 20)
	mask = cv2.line(mask, points[1], points[2], (255, 255, 255), 20)
	mask = cv2.line(mask, points[2], ((mask.shape[1] - 10), 10), (255, 255, 255), 20)

	img = cv2.imread(fileref)
	result = cv2.bitwise_and(img, img, mask = mask)
	return # Score