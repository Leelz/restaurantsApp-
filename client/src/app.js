var UI = require("./views/ui");
var MapWrapper = require("./models/mapWrapper.js");

var app = function() {

  //creates the map
  mapDiv = document.querySelector("#mapDiv");
  var centre = {lat: 55.953029, lng: -3.199359 };
  this.map = new MapWrapper(centre, 13);
  this.map.geoLocate();

  var ui = new UI(this.map);
  
}

window.onload = app;