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
    getGenderById: async function (req, res) {
        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
    
          let gender = await genderModel.findById(req.params.id);
    
          //if we found the user, return that user otherwise return a 404
          if (gender) {
            res.json(gender);
          } else {
            res.status(404).send({
              status: res.statusCode,
              message: "Guest Not Found!",
            });
          }
        } catch (error) {
          console.log("error getting get: " + error);
          //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find the user
          res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
          });
        }
      },
    deleteGender: async function (req, res, next) {
        try {
          //get the user email from the request params
          const id = req.params.id;
    
          //try to find our user by the email provided in the request params
          const gender = await genderModel.findById(id);
    
          //update the user if we found a match and save or return a 404
          if (gender) {
            await gender.deleteOne(gender, function(err, obj) {
              if (err) throw err
            })
          } else {
            res
              .status(404)
              .send({ message: "gender not found", statusCode: res.statusCode });
          }
          res.status(200).send({ message: "gender deleted", statusCode: res.statusCode });
        } catch (error) {
          console.log("failed to delete gender: " + error);
          res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
          });
        }
      },
  };
  
  
  
  module.exports = genderController;