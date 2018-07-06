/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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



/***/ }),
/* 1 */
/***/ (function(module, exports) {

var Restaurant = function(options){
  this.id = options.id;
  this.name = options.name;
  this.laglng = options.latlng;
  this.address = options.address;
  this.phone_number = options.phone_number;
  this.evening_deal = options.evening_deal;
  this.availability = options.availability;
  this.type = options.type;
  this.contact = options.contact;
  this.website = options.website;
}

Restaurant.prototype = {

}

module.exports = Restaurant;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Restaurants = __webpack_require__(3);
var Restaurant = __webpack_require__(1);
var MapWrapper = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Restaurant = __webpack_require__(1);

var Restaurants = function(){

}

Restaurants.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.onload = callback;
    request.send();
  },

  makePost: function(url, newData, callback){
    var data = JSON.stringify(newData);
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send(data);
  },

  makeDeleteRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("DELETE", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send();
  },

  allAPI: function(callback){
    var self = this;
    this.makeRequest("http://localhost:3000/restaurants/api", function(){
      if(this.status !== 200) 
        return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      //var restaurantsAPI = self.populateDropDownList(results);
      callback(results);
    })
  },

  populateDropDownList: function(results){
    var Restaurants = [];
    for (var result of results){
      var restaurant = new Restaurant (result);
    Restaurants.push(restaurant);
    }
    return Restaurants;
  }

}

module.exports = Restaurants;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(2);
var MapWrapper = __webpack_require__(0);

var app = function() {

  //creates the map
  mapDiv = document.querySelector("#mapDiv");
  var centre = {lat: 55.953029, lng: -3.199359 };
  this.map = new MapWrapper(centre, 13);
  this.map.geoLocate();

  var ui = new UI(this.map);
  
}

window.onload = app;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map