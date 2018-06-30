var MapWrapper = function(latlng, zoom) {
  var container = document.querySelector("#mapDiv");
  this.googleMap = new google.maps.Map(container, {
    center: latlng,
    zoom: zoom
  });

}

MapWrapper.prototype = {
  addMarker: function(latlng, restaurant){
    console.log()
    var marker = new google.maps.Marker({
      position: latlng,
      map: this.googleMap,
    });
    google.maps.event.addDomListener(marker, 'click', function() {
      var infobox = document.querySelector("#restaurant_info");
      infobox.innerHTML = "";
      var unselectable = document.createElement("li");

      infobox.innerHTML = restaurant.name;
      infobox.innerHTML = restaurant.address;
      infobox.innerHTML = restaurant.phone_number;
      infobox.innerHTML = restaurant.evening_deal;
      infobox.innerHTML = restaurant.availability;
      infobox.innerHTML = restaurant.website;
    });
    console.log("marker added");
    return marker;
  },

    addInfoWindow: function(map, marker, contentString){
    marker.infoWindow = new google.maps.InfoWindow({
      content: contentString,
    });
    marker.infowindow.open(map, marker);
    marker.infowindow.close();
  }, 

 geoLocate: function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    var centre = {lat: position.latlng.latitude, lng: position.latlng.longitude}; 
    this.googleMap.setCenter(centre); 
    var marker = this.addMarker(centre);

    var infoWindow = new google.maps.InfoWindow({
      content: "<h2>Home</h2>",
    });


      // var infoWindow = this.addInfoWindow(this.googleMap, marker, "<h2>Home</h2>");
      infoWindow.open(this.googleMap, marker);
    }.bind(this));
}
}

module.exports = MapWrapper;

