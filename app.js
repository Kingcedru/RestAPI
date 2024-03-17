const express = require("express");
const app = express();
const morgan = require("morgan");
const orderRoutes = require("./api/routes/orders");

const productRoutes = require("./api/routes/poducts");
const ordersRoutes = require("./api/routes/orders");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "access-Control-Allow-Headers",
    "Origin,  X-Requested-With , Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "PUT, POST, PATCH, DELETE, GET");
   return res.status(200).json({});
  }
  next()
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
