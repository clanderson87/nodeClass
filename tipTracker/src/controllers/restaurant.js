import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Restaurant from '../models/restaurant';

import { authenticate } from '../middleware/authMiddleware';


export default ({ config, db }) => {
  let api = Router();
  
  //for errors
  const errSend = (res, err = null) => {
    if(err) {
      res.status(500).send(err);
    }
  };

   // '/v1/restaurant/add'
   api.post('/add', authenticate, (req, res) => {
     let newRest = new Restaurant();
     console.log("req is ", req.body);
     newRest.name = req.body.name;
     newRest.foodtype = req.body.foodtype;
     newRest.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
     newRest.geometry.coordinates.lon = req.body.geometry.coordinates.lon;
     newRest.cost = req.body.cost;

     newRest.save(err => {
       errSend(res, err);
       res.json({ message: "Restaurant saved successfully!" });
     });
   });

   // 'v1/restaurant/'
   api.get('/', (req, res) => {
      Restaurant.find({}, (err, restaurants) => {
        errSend(res, err);
        res.json(restaurants);
      });
   });

   //'v1/restaurant/id/:id'
   api.get('/id/:id', (req, res) => {
     Restaurant.findById(req.params.id, (err, restaurant) => {
       errSend(res, err);
       res.json(restaurant);
     });
   });
   
   //'v1/restaurant/foodtype/:foodtype'
   api.get('/foodtype/:foodtype', (req, res) => {
     Restaurant.find({foodtype: req.params.foodtype}, (err, restaurants) => {
       errSend(res, err);
       res.json(restaurants);
     });
   });

   // 'v1/restaurant/cost/:cost'
   api.get('/cost/:cost', (req, res) => {
     let low = req.params.cost * .67;
     let high = req.params.cost * 1.33;
     Restaurant.where('cost').gte(low).lte(high).exec((err, restaurants) => {
       errSend(res, err);
       res.json(restaurants);
     });
   });

   // 'v1/restaurant/geo/:radius
   api.get('/geo/:radius', (req, res) => {
     if (!req.params.radius){
       req.params.radius = 10;
     }
     let area = { center: [req.body.geometry.coordinates.lat, req.body.geometry.coordinates.lon], radius: req.params.radius, unique: true, spherical: true };
     Restaurant.where('geometry.coodrinates').within().circle(area).exec((err, restaurants) => {
       errSend(res, err);
       res.json(restaurants);
     });
   });

   return api;
}

