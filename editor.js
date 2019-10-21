// The Google Map.
var map,infoWindow;
var markers = new Array();
var markers2 = new Array();
var clickCount =0;
var clickCount2 =1;


function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #0f0f0f';
        controlUI.style.borderRadius = '4px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '2px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to add big Dumpster';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var dumpbutton = document.createElement('div');
        dumpbutton.style.width = '25px';
		dumpbutton.style.height = '25px';
		dumpbutton.style.backgroundImage = 'url("bigdump.png")';
        controlUI.appendChild(dumpbutton);
		infoWindow = new google.maps.InfoWindow;
		
		var controlUI1 = document.createElement('div');
        controlUI1.style.backgroundColor = '#fff';
        controlUI1.style.border = '2px solid #0f0f0f';
        controlUI1.style.borderRadius = '4px';
        controlUI1.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI1.style.cursor = 'pointer';
        controlUI1.style.marginBottom = '22px';
        controlUI1.style.textAlign = 'center';
        controlUI1.title = 'Click to add small bin';
        controlDiv.appendChild(controlUI1);
		
		var binbutton = document.createElement('div');
        binbutton.style.width = '25px';
		binbutton.style.height = '25px';
		binbutton.style.backgroundImage = 'url("bin.png")';
        controlUI1.appendChild(binbutton);
		infoWindow = new google.maps.InfoWindow; 
        
		
		
		controlUI.addEventListener('click', function() { clickCount++;
			google.maps.event.addListener(map, 'click', function (event) {
				addPoint(event.latLng);
			});
        }); 
		
		controlUI1.addEventListener('click', function() { clickCount2++;
            google.maps.event.addListener(map, 'click', function (event) {
				addPoint(event.latLng);
			});
        }); 
		
}


function init() {
  
    map = new google.maps.Map(document.getElementById('map-holder'), {
    center: {lat: 39.624093, lng: 19.9232902},
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    mapTypeId: 'roadmap'
	});
	
	
	var centerControlDiv = document.createElement('div');   
    var centerControl = new CenterControl(centerControlDiv, map);
	
    
	centerControlDiv.index = 1;
	
    
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
	
	
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
        }
	/*
	google.maps.event.addListener(map, 'click', function (event) {

		addPoint(event.latLng);
	}); 
	
	bindDataLayerListeners(map.data);*/
	
  bindDataLayerListeners(map.data); 
}



function removePoint(marker) {

    for (var i = 0; i < markers.length; i++) {

        if (markers[i] === marker) {

            markers[i].setMap(null);
            markers.splice(i, 1);

            
        }
    }
}
function removePoint2(marker2) {

    for (var i = 0; i < markers2.length; i++) {

        if (markers2[i] === marker2) {

            markers2[i].setMap(null);
            markers2.splice(i, 1);

            
        }
    }
}

function addPoint(latlng) {
	
	var iMax=1;
	var iMax2=2;
	var icon1 = {
		url: "dumpster.png", // url
		scaledSize: new google.maps.Size(20, 20), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};
	var icon2 = {
		url: "bin.png", // url
		scaledSize: new google.maps.Size(20, 20), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};
	if(clickCount == iMax){
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		draggable: true,
		icon:icon1
	});
	markers.push(marker);
	google.maps.event.addListener(marker, 'click', function (event) {

        removePoint(marker);
    });
   clickCount--;
    }else if (clickCount2 == iMax2){
		var marker2 = new google.maps.Marker({
		position: latlng,
		map: map,
		draggable: true,
		icon:icon2
	});
	markers2.push(marker2);
	google.maps.event.addListener(marker2, 'click', function (event) {

        removePoint2(marker2);
    });
   clickCount2--;
	}

} 

/*
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}  */
 

google.maps.event.addDomListener(window, 'load', init);

