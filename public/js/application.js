var NUMBER_OF_TRIES = 3; // Number of points allowed to be drawn
var POINTS = []; // Array of points in the path

$(document).ready(function (){
	$("#congrats").hide();
	$("#score").hide();
	$("#play").hide();
	
	POINTS[0] = [30, 370]; // The starting lower left point
	refresh_side_pane(); // Loads level data

	$("#playImage").click(function (event){
		// Function for drawing and storing points
		
		pos_x = event.offsetX?(event.offsetX):event.pageX - $("#playImage").offsetLeft;
		pos_y = event.offsetY?(event.offsetY):event.pageY - $("#playImage").offsetTop;

		if(NUMBER_OF_TRIES == 1){
			POINTS[3] = [pos_x, pos_y];
			draw_pointer(pos_x, pos_y);
			draw_line(POINTS[2], POINTS[3]);
			POINTS[4] = [570, 30];
			draw_line(POINTS[3], POINTS[4]);
			NUMBER_OF_TRIES--;
			submit_points();
		}

		if(NUMBER_OF_TRIES == 2){
			POINTS[2] = [pos_x, pos_y];
			draw_pointer(pos_x, pos_y);
			draw_line(POINTS[1], POINTS[2]);
			NUMBER_OF_TRIES--;
		}

		if(NUMBER_OF_TRIES == 3){
			POINTS[1] = [pos_x, pos_y];
			draw_pointer(pos_x, pos_y);
			draw_line(POINTS[0], POINTS[1]);
			NUMBER_OF_TRIES--;
		}

	});

});

// ------------------------------------ CANVAS functions

function choose_level(elem){
	$("#score").hide();
	elem = $(elem);
	level_id = elem.attr("id");
	elem.addClass("selected");
	elem.siblings().removeClass("selected");
	var canvas = document.getElementById("playImage");
	var context = canvas.getContext('2d');
	var image_obj = new Image();
	image_obj.src = "/level/" + level_id;
	context.drawImage(image_obj, 0, 0);

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
	context.closePath();

	var color = $(".selected .levelHigh").css("background-color");
	
	var info = "Stick to <div id = 'domColorBox' style = 'background-color: " + color + "; color: " + color + "'>...</div>";
	
	$("#playInfo").html(info);
	$("#play").show();
	
	NUMBER_OF_TRIES = 3; // Resets point drawing abilities
}

function draw_pointer(x, y){
	// Draws a circle for representing a point
	
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

function draw_line(a, b){
	// Draws line from a to b

	var canvas = document.getElementById("playImage");
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(a[0], a[1]);
	context.lineTo(b[0], b[1]);
	context.lineWidth = 6;
	context.stroke();
	context.closePath();
}

// ------------------------------ UI elements

function fade_to_home(){
	// Hides the tutorial pane
	
	$("#tutorial").fadeOut();
}

function ok_congrats(){
	// Hides congratulations pane
	
	$("#congrats").fadeOut();
}

// ------------------------------- SERVER requests here

function refresh_side_pane(){
	// Refresh the side pane
	
	$.ajax({
    	type: "GET",
    	url: "/get_levels",
    	success: function(data) {
    		var output = '';
    		$.each(data.levels, function(index, element){
    			var rgbval = element.r + "," + element.g + "," + element.b;
    			output += "<div class = 'level' id = '" + element.id + "' onclick = 'choose_level(this)' ><img src = '/level/" + element.id + "'><div class = 'levelHigh' style= 'background-color: rgb(" + rgbval + ")'> Distance : " + element.score + "</div></div>";
    		});
      		$('#levels').html(output);
    	},
    	error: function(jqXHR, textStatus, errorThrown){
    		alert("An error occured. Please refresh your page.\nMaybe the server is down.")
    		console.log(errorThrown);
    	}
  	});
}


function submit_points(){
	// Submits the points drawn for evaluation
	
	var level = $(".selected").attr("id");
	var points = POINTS[0][0] + "," + POINTS[0][1] + " " + POINTS[1][0] + "," + POINTS[1][1] + " " + POINTS[2][0] + "," + POINTS[2][1] + " " + POINTS[3][0] + "," + POINTS[3][1] + " " + POINTS[4][0] + "," + POINTS[4][1];
	
	inputs = {
		"level": level,
		"points": points
	};

	$.ajax({
		type: "POST",
		url: "/submit",
		data: inputs,
		success: function(result){
			var x = result.split(" ");
			$("#score").html("Distance : " + x[0]);
			$("#score").show();
			if(x[1] == '1'){
				$("#congrats").show();
				refresh_side_pane();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("An error occured. Please refresh your page.\nMaybe the server is down.")
    	console.log(errorThrown);
		}
	});
}