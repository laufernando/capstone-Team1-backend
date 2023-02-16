const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our guest
//More info: https://mongoosejs.com/docs/schematypes.html
const genderSchema = new mongoose.Schema({
    gender: {
      type: String,
      required: true,
      minlength: 2,
    },
  });
  
  const Gender = mongoose.model("Gender", genderSchema);
  
  //export our model
  module.exports = Gender;