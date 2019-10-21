// The Google Map.
var map;
var markers2 = new Array();

function init() {
  // Initialise the map.
    map = new google.maps.Map(document.getElementById('map-holder'), {
    center: {lat: 39.624093, lng: 19.9232902},
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    mapTypeId: 'roadmap'
	});
	
	google.maps.event.addListener(map, 'click', function (event) {

		addPoint2(event.latLng);
	});
	
	bindDataLayerListeners(map.data);
}
function removePoint(marker) {

    for (var i = 0; i < markers.length; i++) {

        if (markers[i] === marker) {

            markers[i].setMap(null);
            markers.splice(i, 1);

            //polyline.getPath().removeAt(i);
        }
    }
}

function addPoint(latlng) {
	
	var icon1 = {
    url: "dumpster.png", // url
    scaledSize: new google.maps.Size(20, 20), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
		draggable: true,
		icon:icon1
    });

    markers.push(marker);

    //polyline.getPath().setAt(markers.length - 1, latlng);

    google.maps.event.addListener(marker, 'click', function (event) {

        removePoint(marker);
    });
}

google.maps.event.addDomListener(window, 'load', init);