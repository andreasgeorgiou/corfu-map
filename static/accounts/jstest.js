var container = document.getElementById("ourcontainer")
var url = 'http://127.0.0.1:8000/api/clean/'


var ourRequest = new XMLHttpRequest();
ourRequest.open("GET", url);
ourRequest.onload = function(){
	console.log(ourRequest.responseText); // Not json formatted
	var ourData = JSON.parse(ourRequest.responseText);
	
	renderHTML(ourData);
}
ourRequest.send();


function renderHTML(data){
	var container = document.getElementById("ourcontainer")
	var htmlString ="";

	for(i=0; i< data.length; i++){
		htmlString += "<p> This is primary key " + data[i].id + data[i].lat + data[i].lng +"</p>";
	}
 	container.insertAdjacentHTML('beforeend', htmlString);
 }
