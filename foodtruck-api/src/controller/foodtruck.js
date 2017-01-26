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

  return api;
}