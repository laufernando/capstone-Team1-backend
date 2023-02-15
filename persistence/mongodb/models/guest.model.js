const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our guest
//More info: https://mongoosejs.com/docs/schematypes.html
const guestSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Invalid E-mail Address"],
      minlength: 2,
    },
    address:{
      type: String,
      required: false,
      minlength: 2,
    },
    phone:{
      type: String,
      required: true,
      minlength: 2,
    },
    paymentMethod:{
      type: String,
      required: true,
      minlength: 2,
    },
    active:{
      type: Number,
      required: true,
      minlength: 2,
    },
  });
  
  const Guest = mongoose.model("Guest", guestSchema);
  
  //export our model
  module.exports = Guest;