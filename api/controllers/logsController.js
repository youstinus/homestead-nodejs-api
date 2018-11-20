const mongoose = require("mongoose");
const Item = require("../models/log");

exports.get_all = (req, res, next) => {
    Item.find()
    .select("userId details message date _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            /*userId: doc.userId,
            details: doc.details,
            message: doc.message,
            date: doc.date,
            _id: doc._id,*/
            doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/logs/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};

exports.get_by_id = (req, res, next) => {
  const id = req.params.logId;
  Item.findById(id)
    .select("userId details message date _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/logs/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

exports.create = (req, res, next) => {
    const item = new Log({
      _id: new mongoose.Types.ObjectId(),
      userId: req.body.userId, // from headers from auth?
      details: req.body.details,
      message: req.body.message,
      date: req.body.date
    });
    item.save()
      .then(result => {
        res.status(201).json({
          message: "Created log successfully",
          created: {
            userId: result.userId, // from headers from auth?
            details: result.details,
      message: result.message,
      date: result.date,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/logs/" + result._id
            }
          }
        });
      })
      .catch(err => {
        res.status(400).json({
          error: err
        });
      });
  };

exports.delete = (req, res, next) => {
  const id = req.params.logId;
  Item.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "log deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/logs"
        }
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};
