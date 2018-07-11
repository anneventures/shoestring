//const request = require('request');


  var clientId = 'PFQQTXP5LX0VKPGQCR4WVCIKXNEUZ0AMOQU0PJS51EZDO4GJ';
  var clientSecret = 'HVMCQNQDBNFN2PHWRYVBYYGV54G5V2CQJYYXCYS2VQ5HF0FH';
  // get the user's geolocation and store it into a variable
  function queryForSquare(){                                        // plug in geolocation to search URL
      var queryURL = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=" + clientId + "&client_secret=" + clientSecret+ "&v=20181107";
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response){
        //myObj = JSON.stringify(response);
      //  console.log(myObj);
      console.log(response);
      });
  }
  queryForSquare();

