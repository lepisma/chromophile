<!DOCTYPE html>
<html>
<head>
	<title>
		Chromophile
	</title>
	<link rel = "shortcut icon" href = "images/color-wheel.png">
	<link rel = "stylesheet" href = "css/application.css">
	<script src = "js/jquery-2.1.0.min.js"></script>
	<script src = "js/application.js"></script>
</head>
<body>
<div id = "content">
	<div id = "title" onclick = "show_levels">
		Chromophile
	</div>
	<div id = "levelSelect">
		<div id = "levelTitle">Stage Select</div>
		<div id = "levels">
			
		</div>
	</div>
	<div id = "play">
		<div id = "playCanvas">
			<canvas width = "600" height = "400" id = "playImage">
				
			</canvas>
		</div>
		<div id = "playInfo">
			
		</div>
	</div>
	<div id = "score">
	Score : -1
	</div>
</div>
<div id = "tutorial">
	<span id = "tutorialTitle">How to Play</span><br>
	<div id = "tutorialWrapper">
		<div id = "tutorialImage">
			<img src = "images/sample.jpg">
		</div>
		<div id = "tutorialGuide">
			Mark three points in the image so as the line joining the two diagonally opposite points, passing through the three points, suffer minimum deviation from the dominant color.
			Minimize the distance !
			<div id = "tutorialButton" onclick = "fade_to_home()">
				Got it ! Start !
			</div>
		</div>
	</div>
</div>
<div id = "congrats" onclick = "ok_congrats()">
	<img src = "images/star.png">
	<img src = "images/star.png">
	<img src = "images/star.png">
	<p>
		Congrats !! You just reached closest distance !
	</p>
</div>
</body>
</html>