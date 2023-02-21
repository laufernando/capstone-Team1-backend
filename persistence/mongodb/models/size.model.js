const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our guest
//More info: https://mongoosejs.com/docs/schematypes.html
const sizeSchema = new mongoose.Schema({
    size: {
      type: String,
      required: true,
      minlength: 0,
    },
  });
  
  const Size = mongoose.model("Size", sizeSchema);
  
  //export our model
  module.exports = Size;