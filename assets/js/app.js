var clientId = 'PFQQTXP5LX0VKPGQCR4WVCIKXNEUZ0AMOQU0PJS51EZDO4GJ';  // foursquare api login info
var clientSecret = 'HVMCQNQDBNFN2PHWRYVBYYGV54G5V2CQJYYXCYS2VQ5HF0FH';
// get the user's geolocation and store it into a variable



var map;
window.onload = getMyLocation;

function getMyLocation() {

var myLocation = document.querySelector("#myLocation");
myLocation.addEventListener("click", function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(displayLocation);
    myLocation.value=" ";

    myLocation.disabled=true;
  } else {
    locationDenied.innerHTML = "Geolocation is not supported by this browser.";
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
 
   
  queryFourSquare(latitude,longitude);

}



function queryFourSquare(latitude, longitude) {
   
      var adventure = ["hiking", "climbing", "swimming", "adventure", "park"];
      var artist = ["museum", "wine", "lounge", "cafe", "concert"];
      var foodie = ["restaurant", "market", "bakery", "ice cream"];
      

      function artistList(artist) {
        console.log("artist called")
        for (i = 0; i < 4; i++){ 
            var queryArtist = artist[i];                                 //queries user location to find stuff around them     // sets the query search phrase using each element of each array and performs seperate queries
            var queryURL = "https://api.foursquare.com/v2/venues/search?ll=" + latitude + "," + longitude + "&radius=100000"  + "&query=" + queryArtist +  "&client_id=" + clientId + "&client_secret=" + clientSecret+ "&v=20181107";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {  // initial query gets venue id#
              var artistReturn = {};      
              artistReturn.venueID = [];
              artistReturn.venueName = [];  
                  
                  for (x = 0; x < 1; x++) {
                      var venueIDReturn = response.response.venues[x].id; // gets venue id # for each elemnt in the queried array. 
                      var venueNameReturn = response.response.venues[x].name;
                      artistReturn.venueID.push(venueIDReturn);
                      artistReturn.venueName.push(venueNameReturn);
                     
                      // queries the retrieved venue IDs against foursquare.com to get all venue details  
                     var queryScoreURL = "https://api.foursquare.com/v2/venues/" + artistReturn.venueID[x] + "?oauth_token=5W20IUDSZIYPWTA5BHDUZELK5OZFOLFMEPGHNJBMISPXMX2G&v=20181107";  
                     $.ajax({
                         url: queryScoreURL,
                         method: "GET"
                     }).then(function(response){
                      var nameAndScore = {}; 
                      nameAndScore.name = []; 
                      nameAndScore.rating = [];
                      nameAndScore.photo = [];
                      nameAndScore.price = [];
                      nameAndScore.name.push(response.response.venue.name);  
                      nameAndScore.rating.push(response.response.venue.rating);
                      nameAndScore.photo.push(response.response.venue.bestPhoto);
                      // nameAndScore.price.push(response.response.venue.price); for price integration at a later date
  
                          if (nameAndScore.rating > 7) { // only outputs venues with a user rating of 7 or higher
                              for (j = 0; j < nameAndScore.rating.length; j++){
                                  var displayName =("<p>" + nameAndScore.name[j] + "</p>");
                                  var displayRating =("<p>" + nameAndScore.rating[j] + "</p>");
                                  var buildphoto = nameAndScore.photo[j].prefix + 200 + nameAndScore.photo[j].suffix;  // change number between links to change image size :D
                          
                                  $("#theArtist").append(displayName); // PLUG THIS INTO DIV TO DISPLAY ON CARDS
                                  $("#theArtist").append("User score: " + displayRating);  // PLUG THIS INTO DIV TO DISPLAY ON CARDS
                                  $("#theArtist").append("<img src=" + buildphoto + "/>"); // PLUG THIS INTO DIV TO DISPLAY ON CARDS    
                              }    
                          }
                     });
                  };
            });
        };
    }


  function foodieList(foodie) {
              console.log("foodie called")

      for (i = 0; i < 4; i++){ 
          var queryFoodie = foodie[i];                                 //queries user location to find stuff around them     // sets the query search phrase using each element of each array and performs seperate queries
          var queryURL = "https://api.foursquare.com/v2/venues/search?ll=" + latitude + "," + longitude + "&radius=100000"  + "&query=" + queryFoodie +  "&client_id=" + clientId + "&client_secret=" + clientSecret+ "&v=20181107";
          $.ajax({
              url: queryURL,
              method: "GET"
          }).then(function(response) {  // initial query gets venue id#
            var foodieReturn = {};      
            foodieReturn.venueID = [];
            foodieReturn.venueName = [];  
                
                for (x = 0; x < 1; x++) {
                    var venueIDReturn = response.response.venues[x].id; // gets venue id # for each elemnt in the queried array. 
                    var venueNameReturn = response.response.venues[x].name;
                    foodieReturn.venueID.push(venueIDReturn);
                    foodieReturn.venueName.push(venueNameReturn);
                   
                    // queries the retrieved venue IDs against foursquare.com to get all venue details  
                   var queryScoreURL = "https://api.foursquare.com/v2/venues/" + foodieReturn.venueID[x] + "?oauth_token=5W20IUDSZIYPWTA5BHDUZELK5OZFOLFMEPGHNJBMISPXMX2G&v=20181107";  
                   $.ajax({
                       url: queryScoreURL,
                       method: "GET"
                   }).then(function(response){
                    var nameAndScore = {}; 
                    nameAndScore.name = []; 
                    nameAndScore.rating = [];
                    nameAndScore.photo = [];
                    nameAndScore.price = [];
                    nameAndScore.name.push(response.response.venue.name);  
                    nameAndScore.rating.push(response.response.venue.rating);
                    nameAndScore.photo.push(response.response.venue.bestPhoto);
                    // nameAndScore.price.push(response.response.venue.price); for price integration at a later date

                        if (nameAndScore.rating > 7) { // only outputs venues with a user rating of 7 or higher
                            for (j = 0; j < nameAndScore.rating.length; j++){
                                var displayName =("<p>" + nameAndScore.name[j] + "</p>");
                                var displayRating =("<p>" + nameAndScore.rating[j] + "</p>");
                                var buildphoto = nameAndScore.photo[j].prefix + 200 + nameAndScore.photo[j].suffix;  // change number between links to change image size :D
                        
                                $("#theFoodie").append(displayName); // PLUG THIS INTO DIV TO DISPLAY ON CARDS
                                $("#theFoodie").append("User score: " + displayRating);  // PLUG THIS INTO DIV TO DISPLAY ON CARDS
                                $("#theFoodie").append("<img src=" + buildphoto + "/>"); // PLUG THIS INTO DIV TO DISPLAY ON CARDS    
                            }    
                        }
                   });
                };
          });
      };
  }

  function adventureList(adventure) {
              console.log("adventurer called")

      for (i = 0; i < 4; i++){ 
          var queryAdventure = adventure[i];                                 //queries user location to find stuff around them     // sets the query search phrase using each element of each array and performs seperate queries
          var queryURL = "https://api.foursquare.com/v2/venues/search?ll=" + latitude + "," + longitude + "&radius=100000"  + "&query=" + queryAdventure +  "&client_id=" + clientId + "&client_secret=" + clientSecret+ "&v=20181107";
          $.ajax({
              url: queryURL,
              method: "GET"
          }).then(function(response) {  // initial query gets venue id#
            var adventureReturn = {};      
            adventureReturn.venueID = [];
            adventureReturn.venueName = [];  
                
                for (x = 0; x < 1; x++) {
                    var venueIDReturn = response.response.venues[x].id; // gets venue id # for each elemnt in the queried array. 
                    var venueNameReturn = response.response.venues[x].name;
                    adventureReturn.venueID.push(venueIDReturn);
                    adventureReturn.venueName.push(venueNameReturn);
                   
                    // queries the retrieved venue IDs against foursquare.com to get all venue details  
                   var queryScoreURL = "https://api.foursquare.com/v2/venues/" + adventureReturn.venueID[x] + "?oauth_token=5W20IUDSZIYPWTA5BHDUZELK5OZFOLFMEPGHNJBMISPXMX2G&v=20181107";  
                   $.ajax({
                       url: queryScoreURL,
                       method: "GET"
                   }).then(function(response){
                    var nameAndScore = {}; 
                    nameAndScore.name = []; 
                    nameAndScore.rating = [];
                    nameAndScore.photo = [];
                    nameAndScore.price = [];
                    nameAndScore.name.push(response.response.venue.name);  
                    nameAndScore.rating.push(response.response.venue.rating);
                    nameAndScore.photo.push(response.response.venue.bestPhoto);
                    // nameAndScore.price.push(response.response.venue.price); for price integration at a later date

                         // only outputs venues with a user rating of 7 or higher
                            for (j = 0; j < nameAndScore.name.length; j++){
                                var displayName =("<p>" + nameAndScore.name[j] + "</p>");
                                var displayRating =("<p>" + nameAndScore.rating[j] + "</p>");
                                var buildphoto = nameAndScore.photo[j].prefix + 200 + nameAndScore.photo[j].suffix;  // change number between links to change image size :D
                        
                                $("#theAdventurer").append(displayName); // PLUG THIS INTO DIV TO DISPLAY ON CARDS
                               
                                $("#theAdventurer").append("<img src=" + buildphoto + "/>"); // PLUG THIS INTO DIV TO DISPLAY ON CARDS    
                               
                        }
                   });
                };
          });
      };
  }
      
     adventureList(adventure);
     foodieList(foodie);
     artistList(artist);
  };
