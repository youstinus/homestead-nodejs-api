const mongoose = require("mongoose");
const Request = require("../models/request");

// send as email ?
exports.create = (req, res, next) => {
    const item = new Request({
      _id: new mongoose.Types.ObjectId(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      start: req.body.start,
      end: req.body.end,
      details: req.body.details
    });
    item.save()
      .then(result => {
        res.status(201).json({
          message: "Created request successfully",
          created: {
            firstname: result.firstname,
      lastname: result.lastname,
      email: result.email,
      phoneNumber: result.phoneNumber,
      start: result.start,
      end: result.end,
      details: result.details,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/requests/" + result._id
            }
          }
        });
      })
      .catch(err => {
        res.status(403).json({
          error: err
        });
      });
  };