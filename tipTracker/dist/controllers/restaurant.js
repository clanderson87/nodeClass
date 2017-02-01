'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _restaurant = require('../models/restaurant');

var _restaurant2 = _interopRequireDefault(_restaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //for errors?
  var errSend = function errSend(err, res) {
    if (err) {
      res.send(err);
    }
  };

  // '/v1/restaurant/add'
  api.post('/add', function (req, res) {
    var newRest = new _restaurant2.default();
    newRest.name = req.body.name;

    newRest.save(function (err) {
      errSend(err, res);
      res.json({ message: "Restaurant saved successfully!" });
    });
  });

  return api;
};
//# sourceMappingURL=restaurant.js.map