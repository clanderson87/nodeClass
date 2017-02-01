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
     console.log("req is ", req);

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

   return api;
}

