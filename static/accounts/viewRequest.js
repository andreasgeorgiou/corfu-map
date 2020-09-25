
function myMap() {
	var url = 'https://app-smartclean.herokuapp.com/api/request/'
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("GET", url);

	ourRequest.onload = function(){
		console.log(ourRequest.responseText); // Not json formatted
		var data = JSON.parse(ourRequest.responseText); // from text to json the data

		var myMap = new google.maps.Map(document.getElementById('map-holder'), {
    		center: {lat: 39.624093, lng: 19.9232902},
    		zoom: 15,
    		mapTypeControl: true,
    		streetViewControl: false,
    		fullscreenControl: true,
    		mapTypeControlOptions: {
        	mapTypeIds: ['satellite','hybrid']
      		}
		});
    	
		var askIcon1 = {
			url: askIcon, // url
			scaledSize: new google.maps.Size(20, 20), // scaled size
			origin: new google.maps.Point(0,0), // origin
			anchor: new google.maps.Point(0, 0) // anchor
		};

		var markerId = [];
		var marker =[];
		for (i=0; i<data.length; i++){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
				marker[i] = new google.maps.Marker({
					data:[],
					position: myLatLng,
					animation: google.maps.Animation.DROP,
					map: myMap,
					icon:askIcon1,
				});
			markerId[i]=data[i].id;
		} //end for

		var contentString = new Array(data.length);
		var infowindow = new Array(data.length);
	
		for (var i = 0; i < data.length; i++) {

			if (data[i].markertype == 1){
				contentString[i] = 
				'<div id="content">'+
					'<h4 align="center">Request:</h4>'+
            		'<h6 align="center">[ '+data[i].username+' ] feels that </h6>'+
            		'<h6 align="center">a bucket needs</h6>'+
            		'<h6 align="center">to be added here, </h6>'+
            		'<h6 align="center">type: DUMPSTER</h6>'+
            		'<div id="">'+
            				'<center><a class="deleteButton" href="/deleteRequest/'+data[i].id+'/" onclick="return confirm(\'Are you sure?\');">Delete</a></center>'+
					'</div>'+
				'</div>';
        	} else if (data[i].markertype == 2){
				contentString[i] = 
				'<div id="content">'+
					'<h4 align="center">Request:</h4>'+
            		'<h6 align="center">[ '+data[i].username+' ] feels that </h6>'+
            		'<h6 align="center">a bucket needs</h6>'+
            		'<h6 align="center">to be added here, </h6>'+
            		'<h6 align="center">type: BIN</h6>'+
            		'<div id="">'+
            				'<center><a class="deleteButton" href="/deleteRequest/'+data[i].id+'/" onclick="return confirm(\'Are you sure?\');">Delete</a></center>'+
					'</div>'+
				'</div>';
			} else if (data[i].markertype == 3){
				contentString[i] = 
				'<div id="content">'+
					'<h4 align="center">Request:</h4>'+
            		'<h6 align="center">[ '+data[i].username+' ] feels that </h6>'+
            		'<h6 align="center">a bucket needs</h6>'+
            		'<h6 align="center">to be added here, </h6>'+
            		'<h6 align="center">type: RECYCLE DUMP</h6>'+
            		'<div id="">'+
            				'<center><a class="deleteButton" href="/deleteRequest/'+data[i].id+'/" onclick="return confirm(\'Are you sure?\');">Delete</a></center>'+
					'</div>'+
				'</div>';
			}

            infowindow[i] = new google.maps.InfoWindow({
          		content: contentString[i]
        	});
    	}// end for loop

		for (let i = 0; i < data.length; i++) {
			marker[i].addListener('click', function() {
       			infowindow[i].open(myMap, marker[i]);
    		});
		} 
	}
ourRequest.send();


} //end function