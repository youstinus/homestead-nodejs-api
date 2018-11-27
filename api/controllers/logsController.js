const mongoose = require("mongoose");
const Log = require("../models/log");

exports.get_all = (req, res, next) => {
  Log.find()
    //.select("userId details message date _id")
    .exec()
    .then(results => {
      /*const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            userId: doc.userId,
            details: doc.details,
            message: doc.message,
            date: doc.date,
            _id: doc._id,
            doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/logs/" + doc._id
            }
          };
        })
      };*/
      res.status(200).json({
        results
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Get all logs"
      });
    });
};

exports.get_by_id = (req, res, next) => {
  const id = req.params.logId;
  Log.findById(id)
    //.select("userId details message date _id")
    .exec()
    .then(result => {
      if (doc) {
        res.status(200).json({
          result
          /*request: {
            type: "GET",
            url: "http://localhost:3000/logs/"
          }*/
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(400).json({
        error: err,
      message: "Get one log"
     });
    });
};

exports.create = (req, res, next) => {
  /*const user = null;
  if(req.userData && req.userData.userId){
    user = req.userData.userId;
  }*/
    const item = new Log({
      _id: new mongoose.Types.ObjectId(),
      //userId: user, // from headers from auth?
      details: req.body.details,
      message: req.body.message,
      date: new Date()
    });
    item.save()
      .then(result => {
        res.status(201).json({
          result
          //message: "Created log successfully",
          /*: {
            userId: result.userId,
            details: result.details,
      message: result.message,
      date: result.date,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/logs/" + result._id
            }
          }*/
        });
      })
      .catch(err => {
        res.status(400).json({
          error: err,
          message: "Log create"
        });
      });
  };

exports.delete = (req, res, next) => {
  const id = req.params.logId;
  Log.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200)/*.json({
        message: "log deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/logs"
        }
      })*/;
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Log delete"
      });
    });
};
