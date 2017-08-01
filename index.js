function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 54,
      lng: 108,
    },
    zoom: 4,
  });

  var input = document.getElementById('input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  map.addListener("click", function(data) {
    var lat = data.latLng.lat();
    var lon = data.latLng.lng();
    console.log(lat, lon);
  })

  var markers = [];

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Place has no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(80, 60),
        origin: new google.maps.Point(0, 2),
        anchor: new google.maps.Point(21, 21 ),
        scaledSize: new google.maps.Size(21, 21)
      };

      markers = new google.maps.Marker({
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
        map: map,
        icon: icon,
        position: place.geometry.location,
        title: place.name,
      });

      var infowindow = new google.maps.InfoWindow({
        content: '<h1>' + markers["title"] + '</h1>' +
        '<div class = "lat">' + "Lat: " + markers["lat"] + '</div>' +
        '<div class = "lon">' + "Lon: " + markers["lon"] + '</div>'
      });

      markers.addListener('click', function() {
        infowindow.open(map, markers);
      });

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
