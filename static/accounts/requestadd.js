
function myMap() {
	var location = { lat: 39.624093, lng: 19.9232902 };
	var map = new google.maps.Map(document.getElementById('map-holder'), {
    	center: location,
    	zoom: 15,
    	mapTypeControl: true,
    	streetViewControl: false,
    	fullscreenControl: true,
    	mapTypeControlOptions: {
        mapTypeIds: ['satellite','hybrid']
      	}
    	//mapTypeId: 'roadmap'
	});
	
	// Place a draggable marker on the map
	var marker = new google.maps.Marker({
    	map: map,
    	draggable:true,
    	title:"You can drag me!",
    	animation: google.maps.Animation.DROP,
    	position: location
	});

	google.maps.event.addListener(marker, 'dragend', function(){
    	var markerLat = marker.getPosition().lat(); 
    	var markerLng = marker.getPosition().lng(); 
    	var a = markerLat.toFixed(6);
    	var b = markerLng.toFixed(6);
    	funct(a,b);
	});

}// end function map

function funct(a,b){
	document.getElementById("myLat").value = a;
	document.getElementById("myLng").value = b;
}

function clearContents(element) {
  element.value = '';
}
