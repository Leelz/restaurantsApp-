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
      var name = document.createElement("LI");
      var address = document.createElement("LI");
      var phone = document.createElement("LI");
      var deal = document.createElement("LI");
      var availability = document.createElement("LI");
      var website = document.createElement("LI");

      var api_name = restaurant.name;
      var api_address = restaurant.address;
      var api_phone = restaurant.phone_number;
      var api_deal = restaurant.evening_deal;
      var api_availability = restaurant.availability;
      var api_website = restaurant.website;

      name.innerHTML = api_name;
      address.innerHTML = api_address
      phone.innerText = api_phone;
      deal.innerText = api_deal;
      availability.innerText = api_availability;
      website.innerText = api_website;

      infobox.appendChild(name)
      infobox.appendChild(address)
      infobox.appendChild(phone)
      infobox.appendChild(deal)
      infobox.appendChild(availability)
      infobox.appendChild(website)
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

