$(document).ready(function (){
	$("#play").hide();
	// Loads levels data
	$.ajax({
    type: "GET",
    url: "http://127.0.0.1:1234/get_levels",
    success: function(data) {
    	var output = '';
    	$.each(data.levels, function(index, element){
    		output += "<div class = 'level' id = '" + element.id + "' onclick = 'chooseLevel(this)' ><img src = 'http://127.0.0.1:1234/level/" + element.id + "'><div class = 'levelHigh'> Score : " + element.score + "</div></div>"
    		console.log(element.id);
    	});
      $('#levels').html(output);
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert("An error occured. Please refresh your page.\nMaybe the server is down.")
      console.log(errorThrown);
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
	context.drawImage(imageObj, 0, 0)
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
	// Color info set
}

function getCoord(event){
	pos_x = event.offsetX?(event.offsetX):event.pageX - $("#playImage").offsetLeft;
	pos_y = event.offsetY?(event.offsetY):event.pageY - $("#playImage").offsetTop;

	console.log("x : " + pos_x);
	console.log("y : " + pos_y);
}