//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");


//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  }
});


//Generate the model our code will interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const File = mongoose.model("File", fileSchema);

//export our model
module.exports = File;
