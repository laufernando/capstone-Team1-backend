const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our guest
//More info: https://mongoosejs.com/docs/schematypes.html
const paymentSchema = new mongoose.Schema({
    paymentMethod: {
      type: String,
      required: true,
      minlength: 2,
    },
  });
  
  const Payment = mongoose.model("Payment", paymentSchema);
  
  //export our model
  module.exports = Payment;