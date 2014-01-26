var NUMBER_OF_TRIES = 3;
var POINTS = [];

$(document).ready(function (){
	$("#socre").hide();
	$("#play").hide();
	// Loads levels data
	POINTS[0] = [30, 370];
	$.ajax({
    	type: "GET",
    	url: "http://127.0.0.1:1234/get_levels",
    	success: function(data) {
    		var output = '';
    		$.each(data.levels, function(index, element){
    			output += "<div class = 'level' id = '" + element.id + "' onclick = 'chooseLevel(this)' ><img src = 'http://127.0.0.1:1234/level/" + element.id + "'><div class = 'levelHigh'> Score : " + element.score + "</div></div>";
    		});
      		$('#levels').html(output);
    	},
    	error: function(jqXHR, textStatus, errorThrown){
    		alert("An error occured. Please refresh your page.\nMaybe the server is down.")
    		console.log(errorThrown);
    	}
  	});

	$("#playImage").click(function (event){
		pos_x = event.offsetX?(event.offsetX):event.pageX - $("#playImage").offsetLeft;
		pos_y = event.offsetY?(event.offsetY):event.pageY - $("#playImage").offsetTop;

		if(NUMBER_OF_TRIES == 1){
			POINTS[3] = [pos_x, pos_y];
			drawPointer(pos_x, pos_y);
			drawLine(POINTS[2], POINTS[3]);
			POINTS[4] = [570, 30];
			drawLine(POINTS[3], POINTS[4]);
			NUMBER_OF_TRIES--;
			submitPoints();
		}

		if(NUMBER_OF_TRIES == 2){
			POINTS[2] = [pos_x, pos_y];
			drawPointer(pos_x, pos_y);
			drawLine(POINTS[1], POINTS[2]);
			NUMBER_OF_TRIES--;
		}

		if(NUMBER_OF_TRIES == 3){
			POINTS[1] = [pos_x, pos_y];
			drawPointer(pos_x, pos_y);
			drawLine(POINTS[0], POINTS[1]);
			NUMBER_OF_TRIES--;
		}

	});

});

function fadeToHome(){
	$("#tutorial").fadeOut();
}

function chooseLevel(elem){
	elem = $(elem);
	level_id = elem.attr("id");
	elem.addClass("selected");
	elem.siblings().removeClass("selected");
	var canvas = document.getElementById("playImage");
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	imageObj.src = "http://127.0.0.1:1234/level/" + level_id;
	context.drawImage(imageObj, 0, 0);
	//Image drawn

	context.beginPath();
    context.arc(30, 370, 25, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(92, 196, 196)';
    context.fill();
    context.lineWidth = 20;
    context.strokeStyle = '#000000';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.arc(570, 30, 25, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(92, 196, 196)';
    context.fill();
    context.lineWidth = 20;
    context.strokeStyle = '#000000';
    context.stroke();
	// Stage setup ok

	// ct = new ColorThief();
	// playImage = $("#playImage img");
	// var domColor = ct.getColor(playImage);
	// Generate color in html format
	var info = "Stick to<div id = 'domColorBox' style = 'background-color: "/* put color here */ + "'></div>";
	// console.log(info);
	$("#playInfo").html(info);
	$("#play").show();
	$("#score").show();
	NUMBER_OF_TRIES = 3;
	// Color info set
}

function getCoord(event){
	pos_x = event.offsetX?(event.offsetX):event.pageX - $("#playImage").offsetLeft;
	pos_y = event.offsetY?(event.offsetY):event.pageY - $("#playImage").offsetTop;

	console.log("x : " + pos_x);
	console.log("y : " + pos_y);
}

function drawPointer(x, y){
	var canvas = document.getElementById("playImage");
	var context = canvas.getContext('2d');
	context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 10;
    context.strokeStyle = '#000000';
    context.stroke();
    context.closePath();
}

function drawLine(a, b){
	var canvas = document.getElementById("playImage");
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(a[0], a[1]);
	context.lineTo(b[0], b[1]);
	context.lineWidth = 6;
	context.stroke();
	context.closePath();
}

function submitPoints(){

	var level = $(".selected").attr("id");
	var points = POINTS[0][0] + " " + POINTS[0][1] + " " + POINTS[1][0] + " " + POINTS[1][1] + " " + POINTS[2][0] + " " + POINTS[2][1] + " " + POINTS[3][0] + " " + POINTS[3][1] + " " + POINTS[4][0] + " " + POINTS[4][1];
	console.log(points);
	inputs = {
		"level": level,
		"points": points
	};
	console.log(inputs);

	$.ajax({
		type: "POST",
		url: "http://127.0.0.1:1234/submit",
		data: inputs,
		success: function(result){
			console.log(result);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
		}
	});
}