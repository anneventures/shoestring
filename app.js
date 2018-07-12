
  var clientId = 'PFQQTXP5LX0VKPGQCR4WVCIKXNEUZ0AMOQU0PJS51EZDO4GJ';  // foursquare api login info
  var clientSecret = 'HVMCQNQDBNFN2PHWRYVBYYGV54G5V2CQJYYXCYS2VQ5HF0FH';

  // get the user's geolocation and store it into a variable
  window.onload = getMyLocation;
 
  var map;

  function getMyLocation() {
  var address = document.querySelector("#address");
  address.addEventListener("click", function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(displayLocation);
    } else {
      address.innerHTML = "Geolocation is not supported by this browser.";
    }
        });
        
  }
   
  //This function is inokved asynchronously by the HTML5 geolocation API.
  function displayLocation(position) {
    //The latitude and longitude values obtained from HTML 5 API.
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    //Creating a new object for using latitude and longitude values with Google map.
    var latLng = new google.maps.LatLng(latitude, longitude);
   
    showMap(latLng);
   
    addNearByPlaces(latLng);
    createMarker(latLng);
    queryForSquare(latitude, longitude); // queries the foursquare API using the user's lat and long
    //Also setting the latitude and longitude values in another div.
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
  }

  function showMap(latLng) {
    //Setting up the map options like zoom level, map type.
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //Creating the Map instance and assigning the HTML div element to render it in.
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }
   
  function addNearByPlaces(latLng) {
    var nearByService = new google.maps.places.PlacesService(map);
    var request = {
      location: latLng,
      radius: 5000,
      types: ['lodging', 'point_of_interest', 'establishment']
    };
    nearByService.nearbySearch(request, handleNearBySearchResults);
  }
   
  function handleNearBySearchResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(place.geometry.location, place);
      }
    }
  }
   
  function createMarker(latLng, placeResult) {
    var markerOptions = {
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      clickable: true
    }
    //Setting up the marker object to mark the location on the map canvas.
    var marker = new google.maps.Marker(markerOptions);
   
    if (placeResult) {
      var content = placeResult.name+"<br/>"+placeResult.vicinity+"<br/>"+placeResult.types;
      addInfoWindow(marker, latLng, content);
    }
    else {
      var content = "You are here: " + latLng.lat() + ", " + latLng.lng();
      addInfoWindow(marker, latLng, content);
    }
  }
   
  function addInfoWindow(marker, latLng, content) {
    var infoWindowOptions = {
      content: content,
      position: latLng
    };
   
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
   
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.open(map);
    });
  }
 
  function queryForSquare(latitude, longitude) {
    //search URL base
    //"&query='taco'" + search query term example
    // var queryURL = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=" + clientId + "&client_secret=" + clientSecret+ "&v=20181107";
    var queryURL = "https://api.foursquare.com/v2/venues/search?ll=" + latitude + "," + longitude +  "&client_id=" + clientId + "&client_secret=" + clientSecret+ "&v=20181107";
    var adventure = ["hiking", "climbing", "outdoors", "adventure", "park"];
    var artist = ["museum", "wine", "lounge", "cafe", "concert"];
    var foodie = ["restaurant", "market", "bakery", "ice cream"];
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
                var hikingreturn = response.response.venues[j].name;
                console.log(hikingreturn);
    });
}




 
 
  
  

