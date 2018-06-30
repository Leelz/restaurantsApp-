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