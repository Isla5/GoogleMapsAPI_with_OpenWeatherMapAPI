function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 4.444997,
      lng: 106.554199
    },
    zoom: 5
  });

  map.addListener("click", function(data) {
    var lat = data.latLng.lat();
    var lon = data.latLng.lng();
    console.log(lat, lon);
  })
}
