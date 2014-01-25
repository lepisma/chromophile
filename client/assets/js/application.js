$(document).ready(function (){
	// Loads levels data
	$.ajax({
    type: "GET",
    url: "http://127.0.0.1:1234/get_levels",
    success: function(data) {
    	var output = '';
    	$.each(data.levels, function(index, element){
    		output += "<div class = 'level'><img src = 'http://127.0.0.1:1234/level/" + element.id + "'><div class = 'levelHigh'> Score : " + element.score + "</div></div>"
    		console.log(element.id);
    	});
      $('#levels').html(output);
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert("An error occured.Please refresh your page.\nMaybe the server is down.")
      console.log(errorThrown);
    }
  });

});

function fadeToHome(){
	$("#tutorial").fadeOut();
}