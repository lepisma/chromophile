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
	var stage = "<img src = 'http://127.0.0.1:1234/level/" + level_id + "'>";
	$("#playImage").html(stage);
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