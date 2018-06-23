var cities = {
  "Europe": {
    // switz
    "Zurich": { lat: 47.376887, lng: 8.541694 },
    "Geneva": { lat: 46.204391, lng: 6.143158 },
    "Luzern": { lat: 47.050168, lng: 8.309307 },

    // italy
    "Milan": { lat: 45.464204, lng: 9.189982 },
    "Rome": { lat: 41.902783, lng: 12.496366 },
    "Genoa": { lat: 44.40565, lng: 8.946256 },
    "Torino": { lat: 45.070312, lng: 7.686856 },
    "Venice": { lat: 45.440847, lng: 12.315515 },

    // england
    "London": { lat: 51.507351, lng: -0.127758 },

    // ireland
    "Dublin": { lat: 53.349805, lng: -6.26031 },

    // germany
    "Berlin": { lat: 52.520007, lng: 13.404954 },
    "Cologne": { lat: 50.937531, lng: 6.960279 },

    // france
    "Paris": { lat: 48.856614, lng: 2.352222 },
    "Nice": { lat: 43.710173, lng: 7.261953 }
  },

  "Asia": {
    // japan
    "Tokyo": { lat: 35.689487, lng: 139.691706 },

    // china
    "Hong Kong": { lat: 22.396428, lng: 114.109497 },
    "Huangshan": { lat: 29.714699, lng: 118.337521 },
    "Chengdu": { lat: 30.572815, lng: 104.066801 },
    "Dujiangyan": { lat: 31.005165, lng: 103.607531 },
    "Beijing": { lat: 39.9042, lng: 116.407396 },
    "Shanghai": { lat: 31.23039, lng: 121.473702 },
    "Hangzhou": { lat: 30.274084, lng: 120.15507 },
    "Qingdao": { lat: 36.067108, lng: 120.382609 },
    "Shantou": { lat: 23.354091, lng: 116.681972 }
  },

  "Australia": {
    "Cairns": { lat: -16.918551, lng: 145.778055 },
    "Sydney": { lat: -33.86882, lng: 151.209296 },
    "Melbourne": { lat: -37.813628, lng: 144.963058 }
  },

  "North America": {
    // usa
    "Minneapolis": { lat: 44.977753, lng: -93.265011 },
    "St. Paul": { lat: 44.953703, lng: -93.089958 },
    "Las Vegas": { lat: 36.169941, lng: -115.13983 },
    "Los Angeles": { lat: 34.052234, lng: -118.243685 },
    "San Diego": { lat: 32.715738, lng: -117.161084 },
    "Buffalo": { lat: 42.886447, lng: -78.878369 },
    "New York": { lat: 40.712775, lng: -74.005973 },
    "Boston": { lat: 42.360082, lng: -71.05888 },
    "Cambridge": { lat: 42.373616, lng: -71.109734 },
    "Seatle": { lat: 47.606209, lng: -122.332071 },
    "Olympia": { lat: 47.037874, lng: -122.900695 },
    "Redding": { lat: 40.58654, lng: -122.391675 },

    // canada
    "Vancouver": { lat: 49.282729, lng: -123.120738 },
    "Kingston": { lat: 44.231172, lng: -76.485954 },
    "Calgary": { lat: 51.048615, lng: -114.070846 },
    "Tornoto": { lat: 43.653226, lng: -79.383184 }
  }
};

// markers currently added
var markers = {
  "North America": [],
  "Europe": [],
  "Asia": [],
  "Australia": [],
  "Africa": [],
  "South America": []
};

function initMap() {
  // map constructor
  var map = new google.maps.Map(document.getElementById("map"), {
    gestureHandling: "auto",
    zoom: 4,
    center: { lat: 37.871593, lng: -122.272747 }, // berkeley
    minZoom: 3,
    maxZoom: 20,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });

  function zoomInMarker(marker) {
    var marker = marker;

    function nested() {
      console.log(marker.label.text);
      map.setZoom(map.zoom + 6);
      map.setCenter(marker.getPosition());
    }
    return nested;
  }

  // timeout so not everything drops at once
  function addMarkerWithTimeout(country, city, time) {
    window.setTimeout(function() {
      addMarker(country, city);
    }, time);
  }

  function addMarker(country, city) {
    var marker = new google.maps.Marker({
      label: {
        text: city,
        color: "white",
        fontSize: "10px"
      },
      animation: google.maps.Animation.DROP,
      position: cities[country][city],
      map: map
    });

    markers[country].push(marker);
    google.maps.event.addListener(marker, "click", zoomInMarker(marker));
  }

  // add berkeley as base
  var berkeley = { lat: 37.871593, lng: -122.272747 };
  var temp = new google.maps.Marker({
    label: {
      text: "Berkeley",
      color: "white",
      fontSize: "10px"
    },
    animation: google.maps.Animation.DROP,
    position: berkeley,
    map: map
  });

  function addCountry(country) {
    for (var i = 0; i < markers[country].length; i++) {
      markers[country][i].setMap(null);
    }
    var counter = 0;
    for (var city in cities[country]) {
      addMarkerWithTimeout(country, city, counter * 50);
      counter++;
    }
  }

  /* 
      FLOW:
      1. addCountry
      2. addMarkerWithTimeout 
      3. addMarker

      marker gets added in addmarker with all details
      */

  // BUTTONS

  // init buttons
  for (var country in markers) {
    // first letter lowercase + 1 to the end for button ID
    var id =
      country[0].toLowerCase() +
      country.slice(1, country.length).replace(/ /g, "") +
      "Button";

    // nested function
    document.getElementById(id).onclick = (function(country) {
      var country = country;

      function nested() {
        // change focus to center when clicked
        if (country == "Asia") {
          map.setCenter({ lat: 29.714699, lng: 118.337521 }); // Huangshan
        } else if (country == "North America") {
          map.setCenter({ lat: 40.820744, lng: -96.70047 }); // Nebraska (lol)
        } else if (country == "Europe") {
          map.setCenter({ lat: 47.050168, lng: 8.309307 });
        } else if (country == "Australia") {
          map.setCenter({ lat: -28.953512, lng: 135.857048 });
        }

        function unvisited(country) {
          swal({
            text: "Haven't visited " + country + " yet!",
            width: 300
          });
        }
        // check if visited country yet
        if (country === "Africa" || country === "South America") {
          return unvisited(country);
        } else {
          map.setZoom(5);
          addCountry(country);
        }
      }
      return nested;
    })(country);
  }

  // all
  document.getElementById("all").onclick = function() {
    for (var country in cities) {
      addCountry(country);
    }
    map.setZoom(3);
  };

  // clear
  document.getElementById("clear").onclick = function() {
    for (var country in cities) {
      for (var i = 0; i < markers[country].length; i++) {
        markers[country][i].setMap(null);
      }
    }
  };

  // zoom out
  document.getElementById("out").onclick = function() {
    map.setZoom(3);
  };

  // home
  document.getElementById("home").onclick = function() {
    map.setCenter(berkeley);
  };

  // BUTTONS END

  // making sure doens't go out of bounds
  var lastValidCenter;
  setOutOfBoundsListener();

  function setOutOfBoundsListener() {
    google.maps.event.addListener(map, "dragend", function() {
      checkLatitude(map);
    });
    google.maps.event.addListener(map, "idle", function() {
      checkLatitude(map);
    });
    google.maps.event.addListener(map, "zoom_changed", function() {
      checkLatitude(map);
    });
  }

  function checkLatitude(map) {
    var bounds = map.getBounds();
    var sLat = map
      .getBounds()
      .getSouthWest()
      .lat();
    var nLat = map
      .getBounds()
      .getNorthEast()
      .lat();
    if (sLat < -85 || nLat > 85) {
      //the map has gone beyone the world's max or min latitude - gray areas are visible
      //return to a valid position
      if (this.lastValidCenter) {
        map.setCenter(this.lastValidCenter);
      }
    } else {
      this.lastValidCenter = map.getCenter();
    }
  }
}
