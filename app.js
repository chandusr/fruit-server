const express = require("express");
const FruitRoutes = require("./fruit-routes");
const CartRoutes = require("./cart-routes")
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 1234;
const apiRoutes = express.Router();

// TODO-1: need to npm install and run to start up this fruit server

// setup the fruit routes
FruitRoutes.setup(apiRoutes);

// TODO-4: need to setup route for cart purchase
CartRoutes.setup(apiRoutes);

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
  
    next();
  });
// all REST api calls should be under api
app.use("/api", apiRoutes);

// basic get route for the system
app.get("/", (req, res) => {
  res.send("Welcome to fruit server 1.0.0");
});


// listening on the nodemon port configured in @see package.json
app.listen(port, (req, res) => {
  console.log(
    `fruit server started from nodemon and listening at http://localhost:${port}`
  );
});

// Custom Error handler for fruit server
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        error: {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
       },
      });
  // TODO-5: handle common errors
});
