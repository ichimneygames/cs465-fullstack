const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // register model
const Model = mongoose.model('trips');

// get: //trips - list all the trips
// regardless of outcome, response must include html status code
// and json message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // no filter return all
        .exec();

        //uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if (!q)
    { // database returned no data
        return res
                .status(404)
                .json(err);
    } else { //return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

// get: /trips/:tripsCode - list a single trip
// regardless of outcome, response must include html status code
// and json message to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // return single record
        .exec();

        //uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if (!q)
    { // database returned no data
        return res
                .status(404)
                .json(err);
    } else { //return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

module.exports = {
    tripsList,
    tripsFindByCode
};