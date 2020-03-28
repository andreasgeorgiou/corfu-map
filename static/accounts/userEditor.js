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

	var icon1a = {
		url: url1a, // url
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
	var icon2a = {
		url: url2a, // url
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
	var icon3a = {
		url: url3a, // url
		scaledSize: new google.maps.Size(20, 20), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};

	var marker = [];
	var markerId = [];
	
	

	for (i=0; i<data.length; i++){
		
		if (data[i].markertype == "1"){
			if (data[i].full == true || data[i].broke == true || data[i].missing == true ){
				var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
				marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon1a
				});
			}else{
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon1
				});
			}
		}else if (data[i].markertype == "2"){
			if (data[i].full == true || data[i].broke == true || data[i].missing == true ){
				var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
				marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon2a
				});
			}else{
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon2
				});
			}
		}else if (data[i].markertype == "3"){
			if (data[i].full == true || data[i].broke == true || data[i].missing == true ){
				var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
				marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon3a
				});
			}else{
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
			marker[i] = new google.maps.Marker({
				data:[],
				position: myLatLng,
				map: myMap,
				//draggable: true,
				icon:icon3
				});
			}
		}
		markerId[i]=data[i].id;
	} //end for

	var contentString = new Array(data.length);
	var infowindow = new Array(data.length);
	var csrf = new Array(data.length);

	for (var i = 0; i < data.length; i++) {

		if(data[i].full == true){
			contentString[i] = '<div id="content">'+
            '<div id="siteNotice">'+
            	'</div>'+
            		'<form action="">'+
            			'<h4 align="center">Status</h4>'+
            			'<h6 align="center">Garbage is Full!</h6>'+
            		'</form>'+
            	'<div id="bodyContent">'+
            '</div>'+
            '</div>';
        }else if(data[i].broke == true){
			contentString[i] = '<div id="content">'+
            '<div id="siteNotice">'+
            	'</div>'+
            		'<form action="">'+
            			'<h4 align="center">Status</h4>'+
            			'<h6 align="center">Garbage is Broke!</h6>'+
            		'</form>'+
            	'<div id="bodyContent">'+
            '</div>'+
            '</div>';
        }else if(data[i].missing == true){
			contentString[i] = '<div id="content">'+
            '<div id="siteNotice">'+
            	'</div>'+
            		'<form action="">'+
            			'<h4 align="center">Status</h4>'+
            			'<h6 align="center">Garbage is Missing!</h6>'+
            		'</form>'+
            	'<div id="bodyContent">'+
            '</div>'+
            '</div>';
        }else{
        	contentString[i] = '<div id="content">'+
            '<div id="siteNotice">'+
            	'</div>'+
            		'<h6 align="center">Report</h6> '+
            		'<button class="name1"><a href="/full/'+data[i].id+'/">Full</a></button><br>'+
            		'<button class="name2"><a href="/broke/'+data[i].id+'/">Broke</a></button><br>'+
            		'<button class="name3"><a href="/missing/'+data[i].id+'/">Missing</a></button><br>'+
            	'<div id="bodyContent">'+
            '</div>'+
            '</div>';
        }

            infowindow[i] = new google.maps.InfoWindow({
          		content: contentString[i]
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

