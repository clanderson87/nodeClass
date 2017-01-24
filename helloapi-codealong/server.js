// require npm packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// require developer-createds
var Vehicle = require('./app/models/vehicle');

// Configure app for bodyParser()
// lets us grab data from body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set up port for server to listen on
var port = process.env.PORT || 3000;

//Connect to DB
mongoose.connect('mongodb://localhost:27017/codealong');

//API routes
var router = express.Router();

// Routes will all prefixed with /api/
app.use('/api', router);

// Middleware -
// Middleware can be very useful for doing validations, logging things, or stopping unsafe requests.
// Middleware to use for all requests

router.use(function(request, response, next){
  console.log("middleware is happening!");
  next();
})

//Test route
router.get('/', function(request, response){
  response.json({message: "Welcome to our API!"});
});

//Vehicles route
router.route('/vehicles')
  .post(function(request, response){
    var vehicle = new Vehicle(); //new instance of Vehicle
    vehicle.make = request.body.make;
    vehicle.model = request.body.model;
    vehicle.color = request.body.color;

    vehicle.save(function(error) {
      if(error){
        response.send(error);
      }
      response.json({message: "Vehicle was successfully manufactured!"});
    });
  })
  .get(function(req, res){
    Vehicle.find(function(err, vehicles){
      if (err){
        res.send(err);
      }
      res.json(vehicles);
    });
  });

//get Vehicles by ID
router.route('vehicle/:vehicle_id')
  .get(function(req, res) {
    Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

//color route
router.route('/vehicle/color/:color')
  .get(function(req, res){
    Vehicle.find({color: req.params.color}, function(err, vehicle){
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

//make route
router.route('/vehicle/make/:make')
  .get(function(req, res){
    Vehicle.find({make: req.params.make}, function(err, vehicle){
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

//Fires server
app.listen(port);

//Sanity check
console.log('Server listening on port ' + port);
