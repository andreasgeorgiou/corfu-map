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
	
	for (i=0; i<data.length; i++){
		
		if (data[i].markertype == "1"){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			var marker = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon1
			});
		}else if (data[i].markertype == "2"){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			var marker = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon2
			});
		}else if (data[i].markertype == "3"){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			var marker = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon3
			});
		}


	} //end for

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