var Restaurants = require("../models/restaurants.js");
var Restaurant = require("../models/restaurant.js");
var MapWrapper = require("../models/mapWrapper.js");

// var QuizUI = new QuizUI();

var UI = function(map){ 

	this.restaurants = new Restaurants();

	this.restaurants.allAPI(function(result){
		this.addRestaurantToMap(result);
	}.bind(this));

}

UI.prototype = {
	addRestaurantToMap: function(restaurantsAPI){
		var infobox = document.querySelector("#restaurant_info");
		infobox.innerHTML = "this worked"
		for (var restaurant of restaurantsAPI){
			var marker = map.addMarker({lat: restaurant.latlng[0], lng: restaurant.latlng[1]}, restaurant)
			/*map.addInfoWindow(this.map, marker, "<h2>" + restaurant.name + "</h2>");*/
		}
	}
}

module.exports = UI;
