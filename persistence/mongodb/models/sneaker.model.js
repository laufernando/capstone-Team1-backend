//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");


//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const sneakerSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
    minlength: 0,
  },
  genero: {
    type: String,
    required: true,
    minlength: 0,
  },
  talla: {
    type: String,
    required: true,
    minlength: 0,
  },
  img: {
    type: String,
    required: true,
    minlength: 0,
  },
  descripcion: {
    type: String,
    required: true,
    minlength: 0,
  }, 
  cantidad: {
    type: Number,
    required: true,
    minlength: 0,
  }, 
  precio: {
    type: Number,
    required: true,
    minlength: 0,
  },      
});
/*
userSchema.pre("save", function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});*/

//Generate the model our code will interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const Sneaker = mongoose.model("Sneaker", sneakerSchema);

//export our model
module.exports = Sneaker;
