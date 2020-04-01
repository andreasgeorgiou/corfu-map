
function myMap() {
	var url = 'http://127.0.0.1:8000/api/reports/'
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
    	
    	//<a download="custom-filename.png" href="/path/to/image" title="ImageName">Download Image</a>	

		var markerId = [];
		var marker =[];
		for (i=0; i<data.length; i++){
			var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
				marker[i] = new google.maps.Marker({
					data:[],
					position: myLatLng,
					animation: google.maps.Animation.DROP,
					map: myMap,
				});
			markerId[i]=data[i].id;
		} //end for

		var contentString = new Array(data.length);
		var infowindow = new Array(data.length);
	
		for (var i = 0; i < data.length; i++) {
				contentString[i] = 
				'<div id="content">'+
					'<h4 align="center">Report</h4>'+
            		'<h6 align="center">from [ '+data[i].username+' ]</h6>'+
            			'<div id="">'+
            				'<label for="Description"><h6>Description:</h6></label>'+
            				'<textarea readonly id="Description" rows="2" cols="20">'+data[i].descr+'</textarea><br><br>'+
							'<a  href='+data[i].image+'><h6>View the image</h6></a>'+
							'<center><a class="deleteButton" href="/deleteReport/'+data[i].id+'/" onclick="return confirm(\'Are you sure?\');">Delete</a></center>'+
						'</div>'+
				'</div>';
        	

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