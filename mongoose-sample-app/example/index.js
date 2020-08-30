"use strict";

// Dependencies
const mongoose = require("mongoose");

// Connect
mongoose.connect(process.env.DB_URI || "mongodb://localhost/test", {useNewUrlParser: true}, err => {
    console.log(err || "Connected successfully...")
})


// Create the model
const Kitten = mongoose.model("Kitten", new mongoose.Schema({
  name: String
}));


// Insert
const noir = new Kitten({ name: "Noir" });
noir.save()
    .then(console.log)
    .catch(console.error)
