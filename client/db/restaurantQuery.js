var MongoClient = require("mongodb").MongoClient;

var RestaurantQuery = function(){
  this.url = "mongodb://localhost:27017/restaurants_site";
};

RestaurantQuery.prototype = {
  allFromAPI: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection("restaurants");
      console.log(collection);
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },

    add: function(restaurantToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
      var collection = db.collection("restaurants");
      collection.insert(restaurantToAdd);
      collection.find().toArray(function(err, docs){
        console.log(docs);
        onQueryFinished(docs);
      });
    };
    });
  },

  addVisited: function(restaurantToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
      var collection = db.collection("restaurantsVisited");
      collection.insert(restaurantToAdd);
      collection.find().toArray(function(err, docs){
        console.log(docs);
        onQueryFinished(docs);
      });
    };
    });
  },
  
  allVisited: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
          var collection = db.collection("restaurantsVisited");
          console.log("returned from restaurantsVisited DB", collection);
          collection.find().toArray(function(err, docs){
            console.log(docs);
            console.log("hello docs should appear" );
            onQueryFinished(docs);
      });
    });
  },

  deleteVisitedRestaurants: function(){
    MongoClient.connect(this.url, function(err, db){
      if(err){
        console.log(err);
      }else{
          var collection = db.collection("restaurantsVisited");
          collection.drop("restaurantsVisited");
          db.createCollection("restaurantsVisited");
        }
      });
    }
};


module.exports = RestaurantQuery;