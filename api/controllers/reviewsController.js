const mongoose = require("mongoose");
const Review = require("../models/review");

// taisyti
exports.get_all = (req, res, next) => {
    Review.find( {homesteadId: req.params.homesteadId} )
    .select("homesteadId userId name score title details created _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            homesteadId: doc.homesteadId,
            userId: doc.userId,
            name: doc.name,
            score: doc.score,
            title: doc.title,
            details: doc.details,
            created: doc.details, // date now?
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/reviews/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(403).json({
        error: err
      });
    });
};

exports.get_by_id = (req, res, next) => {
  const id = req.params.reviewId;
  Review.findById(id)
    .select("homesteadId name score title details created _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/reviews/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(403).json({ error: err });
    });
};

exports.create = (req, res, next) => {
    const review = new Review({
      _id: new mongoose.Types.ObjectId(),
      homesteadId: req.body.homesteadId, // from headers from auth?
      userId: req.userData.userId,
      name: req.body.name,
      score: req.body.score,
      title: req.body.title,
      details: req.body.details,
      created: req.body.created // date time now?
    });
    review.save()
      .then(result => {
        res.status(201).json({
          message: "Created review successfully",
          created: {          
            homesteadId: result.homesteadId,
            userId: result.userId,
            name: result.name,
            score: result.score,
            title: result.title,
            details: result.details,
            created: result.created,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/reviews/" + result._id
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

exports.update = (req, res, next) => {
  const id = req.params.reviewId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Review.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "review updated",
        request: {
          type: "PUT/PATCH",
          url: "http://localhost:3000/reviews/" + id
        }
      });
    })
    .catch(err => {
      res.status(403).json({
        error: err
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.reviewId;
  Review.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "review deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/reviews"
        }
      });
    })
    .catch(err => {
      res.status(403).json({
        error: err
      });
    });
};
