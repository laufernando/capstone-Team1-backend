const genderModel = require("../models/gender.model");

//build our controller that will have our CRUD and other methods for gender
const genderController = {
    //method to create a new gender
    createGender: async function (req, res) {
      try {
        //store user data sent through the request
        const gender = req.body;
  
        
        let newGender= await genderModel.create(gender);
  
        //return the newly created gender
        res.status(201).json(await genderModel.findById(newGender._id));
      } catch (error) {
        //handle errors creating gender
        console.log("failed to create Gender: " + error);
        res.status(400).json({
          message: error.message,
          statusCode: res.statusCode,
        });
      }
    },
  };
  
  
  
  module.exports = genderController;