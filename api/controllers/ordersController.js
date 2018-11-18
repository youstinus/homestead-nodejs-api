const mongoose = require("mongoose");

const Order = require("../models/order");
const Homestead = require("../models/homestead");
const User = require("../models/user");

exports.get_all_orders = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_all_orders_by_user = (req, res, next) => {
  const id = req.params.userId;
  Order.find({buyer: id})
    .select("seller buyer homestead startDate endDate price _id")
    .populate("seller", "buyer", "homestead")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            seller: doc.seller,
            buyer: doc.buyer,
            homestead: doc.homestead,
            startDate: doc.startDate,
            endDate: doc.endDate,
            price: doc.price,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create_order = (req, res, next) => {

  const buyer1 = User.findById(req.body.userId);
  const seller1 = User.findById(req.body.userId);

  Homestead.findById(req.body.homesteadId)
    .then(homestead => {
      if (!homestead) {
        return res.status(404).json({
          message: "Homestead not found"
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        seller: req.body.sellerId,
        buyer: req.body.buyerId,
        homestead: req.body.homesteadId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        price: req.body.price,
      });
      return order.save();
    })
    .then(result => {
      //console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          seller: seller1, //result.seller, // how to add
          buyer: buyer1, //result.buyer, // how to add
          homestead: result.homestead,
          startDate: result.startDate,
          endDate: result.endDate,
          price: result.price,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_order_by_id = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("seller", "buyer", "homestead")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { homesteadId: "ID", price: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
