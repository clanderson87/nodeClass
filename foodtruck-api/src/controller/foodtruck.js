import mongoose from 'mongoose';
import { Router } from 'express';
import Foodtruck from '../model/foodtruck';
import Review from '../model/review';



export default ({ config, db }) => {
  let api = Router();

  //v1/foodtruck/add
  api.post('/add', (req, res) => {
    let newFoodtruck = new Foodtruck();
    newFoodtruck.name = req.body.name;
    newFoodtruck.foodtype = req.body.foodtype;
    newFoodtruck.avgcost = req.body.avgcost;
    newFoodtruck.geometry.coordinates = req.body.geometry.coordinates;

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
  });

  // add review for specific foodtruck id
  // /v1/foodtruck/reviews/add/:id
  api.post('/reviews/add/:id', (req, res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title,
      newReview.text = req.body.text,
      newReview.foodtruck = foodtruck._id
      
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        foodtruck.reviews.push(newReview);
        foodtruck.save(err => {
          if (err) { 
            res.send(err);
          }
          res.json({ message: 'Food truck review saved!' })
        })
      })
    })
  })

  //v1/foodtruck/reviews/:id
  api.get('/reviews/:id', (req, res) => {
    Review.find( {foodtruck: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  //v1/foodtruck/foodtype/:type
  api.get('/foodtype/:type', (req, res) => {
    Foodtruck.find({foodtype: req.params.type}, (err, foodtrucks) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  //v1/foodtruck/avgcost/:avgcost

  api.get('/avgcost/:avgcost', (req, res) => {
    let upperLimit = parseInt(req.params.avgcost) + 5;
    let lowerLimit = req.params.avgcost - 5;
    console.log("upperLimit is ", upperLimit, "lowerLimit is ", lowerLimit);
    Foodtruck.where('avgcost').gte(lowerLimit).lte(upperLimit).exec((err, foodtrucks) => {
      if (err) {
        res.send(err);
      }
      res.send(foodtrucks);
    });
  });

  return api;
}