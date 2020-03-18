var url = 'http://127.0.0.1:8000/api/clean/'


var ourRequest = new XMLHttpRequest();
ourRequest.open("GET", url);
ourRequest.onload = function(){
	console.log(ourRequest.responseText); // Not json formatted
	var ourData = JSON.parse(ourRequest.responseText);
	myMap(ourData);
}
ourRequest.send();
	
function myMap(data) {

	var myMap = new google.maps.Map(document.getElementById('map-holder'), {
    	center: {lat: 39.624093, lng: 19.9232902},
    	zoom: 15,
    	mapTypeControl: true,
    	streetViewControl: false,
    	fullscreenControl: true,
    	mapTypeControlOptions: {
        mapTypeIds: ['satellite','hybrid']
      	}
    	//mapTypeId: 'roadmap'
	});

	var icon1 = {
		url: url1, // url
		scaledSize: new google.maps.Size(20, 20), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};

	var icon2 = {
		url: url2, // url
		scaledSize: new google.maps.Size(20, 20), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};

	var icon3 = {
		url: url3, // url
		scaledSize: new google.maps.Size(20, 20), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};

	var marker = [];
	var markerId = [];

	

	for (i=0; i<data.length; i++){
		
		if (data[i].markertype == "1"){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon1
			});
		}else if (data[i].markertype == "2"){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon2
			});
		}else if (data[i].markertype == "3"){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
		    marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon3
			});
		}
		markerId[i]=data[i].id;

	} //end for

	var contentString = new Array(data.length);
	var infowindow = new Array(data.length);
	for (var i = 0; i < data.length; i++) {
		
			contentString[i] = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<form action="/action_page.php">'+
            '<h6 align="center">Report</h6>'+
            '<input type="checkbox" id="id" name="id" value="full">'+
            '<label for="vehicle1"> Garbage is full</label><br>'+
            '<input type="checkbox" id="vehicle2" name="vehicle2" value="broke">'+
  			'<label for="vehicle2"> Garbage is Broke</label><br>'+
            '<input type="checkbox" id="vehicle3" name="vehicle3" value="missing">'+
  			'<label for="vehicle3"> Garbage is missing</label><br><br>'+
  			'<input type="submit" value="Submit">'+
            '</form>'+
            '<div id="bodyContent">'+
            '</div>'+
            '</div>';

            infowindow[i] = new google.maps.InfoWindow({
          		content: contentString[i]+markerId[i]
        	});
    }

	for (let i = 0; i < data.length; i++) {
		marker[i].addListener('click', function() {
       			infowindow[i].open(myMap, marker[i]);
    		});
		
		
	}
  	

	/*
	infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your location is here.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        } */ //find the user's location

} //end function