const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const productsRoutes = require("./api/routes/productsRoutes");
const ordersRoutes = require("./api/routes/ordersRoutes");
const usersRoutes = require('./api/routes/usersRoutes');
const homesteadsRoutes = require('./api/routes/homesteadsRoutes');
const favoritesRoutes = require('./api/routes/favoritesRoutes');
const logsRoutes = require('./api/routes/logsRoutes');
const offersRoutes = require('./api/routes/offersRoutes');
const requestsRoutes = require('./api/routes/requestsRoutes');
const reviewsRoutes = require('./api/routes/reviewsRoutes');
const settingsRoutes = require('./api/routes/settingsRoutes');

//mongoose.set('useCreateIndex', true); // do need?
mongoose.connect(
// variable saved on server or on .env file
    process.env.PROD_MONGODB,
    { 
      useCreateIndex: true,
      useNewUrlParser: true
    } // do need?
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);
app.use("/homesteads", homesteadsRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/logs", logsRoutes);
app.use("/offers", offersRoutes);
app.use("/requests", requestsRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/settings", settingsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 409;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
