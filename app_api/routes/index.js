const express = require("express");
const router = express.Router();

// this is where we import the controllers we will route
const tripsController = require("../controllers/trips");

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); // GET method routes triplist

// Get and update a single trip by code
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdate);

module.exports = router;
