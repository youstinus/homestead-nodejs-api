const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              role: req.body.role,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phoneNumber: req.body.phoneNumber,
              age: req.body.age
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                //console.log(err);
                res.status(400).json({
                  error: err,
                  message: "User was not created. Check credentials"
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              role: user[0].role,
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "5h"            
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token // or just token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Other login issues"
      });
    });
};

// create user update method
exports.user_update = (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value; // hash password p
  }

  User.update({ _id: id, userId: req.userData.userId }, { $set: updateOps })
    .exec()
    .then(user => {
      if (user.length != 1) {
        return res.status(409).json({
          message: "User not found"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(400).json({
              error: err,
              message: "Errorhr" // check here if viable
            });
          } else {

            /*const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              role: req.body.role,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phoneNumber: req.body.phoneNumber,
              age: req.body.age
            });*/
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                //console.log(err);
                res.status(400).json({
                  error: err,
                  message: "User was not updated. Check credentials"
                });
              });
          }
        });
      }
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.userData.userId })
    .exec()
    .then(result => {
      res.status(200)/*.json({
        message: "User deleted"
      })*/;
    })
    .catch(err => {
      //console.log(err);
      res.status(400).json({
        error: err,
        message: "User not deleted"
      });
    });
};
