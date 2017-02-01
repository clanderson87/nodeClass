import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Restaurant from '../models/restaurant';


export default ({ config, db }) => {
  let api = Router();
  
  //for errors
  const errSend = (res, err = null) => {
    if(err) {
      res.send(err);
    }
  };

   // '/v1/restaurant/add'
   api.post('/add', (req, res) => {
     let newRest = new Restaurant();
     newRest.name = req.body.name;
     newRest.foodtype = req.body.foodtype;
     newRest.geometry.coordinates = req.body.geometry.coordinates;
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

   


   return api;
}

