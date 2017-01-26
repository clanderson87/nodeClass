import mongoose from 'mongoose';
import { Router } from 'express';
import Foodtruck from '../model/foodtruck';

export default ({ config, db }) => {
  let api = Router();

  //v1/foodtruck/add
  api.post('/add', (req, res) => {
    let newFoodtruck = new Foodtruck();
    newFoodtruck.name = req.body.name;

    newFoodtruck.save(err => {
      if(err) {
        res.send(err);
      }
      res.json({ message: 'Foodtruck Saved Successfully!'});
    });
  });

  //v1/foodtruck/
  api.get('/', (req, res) => {
    Foodtruck.find({}, (err, foodtrucks) => {
      if(err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  //v1/foodtruck:id
  api.get('/:id', (req, res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  //v1/foodtruck/:id
  api.put('/:id', (req, res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if (err){
        res.send(err)
      }
      foodtruck.name = req.body.name;
      foodtruck.save(err => {
        if (err){
          res.send(err)
        }
        res.json({ message: "Foodtruck saved successfully!" });
      });
    });
  });

  //v1/foodtruck/:id
  api.delete('/:id', (req, res) => {
    Foodtruck.remove({
      _id: req.params.id
    }, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "That foodtruck got got."});
    });
  })

  return api;
}