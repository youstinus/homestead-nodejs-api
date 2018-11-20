const mongoose = require("mongoose");
const Offer = require("../models/offer");

exports.get_all = (req, res, next) => {
    Offer.find()
    .select("homesteadId start end price active")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            homesteadId: doc.homesteadId,
            start: doc.start,
            end: doc.end,
            price: doc.price,
            active: doc.active,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/offers/" + doc._id
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
  const id = req.params.offerId;
  Offer.findById(id)
    .select("homesteadId start end price active")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/offers/"
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
    const item = new Offer({
      _id: new mongoose.Types.ObjectId(),
       // from headers from auth?
      homesteadId: req.body.homesteadId,
      start: req.body.start,
      end: req.body.end,
      price: req.body.price,
      active: req.body.active
    });
    item.save()
      .then(result => {
        res.status(201).json({
          message: "Created offer successfully",
          created: {
             // from headers from auth?
            homesteadId: result.homesteadId,
            start: result.start,
            end: result.end,
            price: result.price,
            active: result.active,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/offers/" + result._id
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

exports.update = (req, res, next) => {
  const id = req.params.offerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Offer.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "offer updated",
        request: {
          type: "PUT",
          url: "http://localhost:3000/offers/" + id
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
  const id = req.params.offerId;
  Offer.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "offer deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/offers"
        }
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};
