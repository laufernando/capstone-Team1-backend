//Import our model so we can us it to interact with the realated data in MongoDB
const guestModel = require("../models/guest.model");

//build our controller that will have our CRUD and other methods for our guests
const guestController = {
  //method to create a new guest
  createGuest: async function (req, res) {
    try {
      //store user data sent through the request
      const guest = req.body;

      
      let newGuest= await guestModel.create(guest);

      //return the newly created guest
      res.status(201).json(await guestModel.findById(newGuest._id));
    } catch (error) {
      //handle errors creating guest
      console.log("failed to create Guest: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
  getGuestById: async function (req, res) {
    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        

      let guest = await guestModel.findById(req.params.id);

      //if we found the user, return that user otherwise return a 404
      if (guest) {
        res.json(guest);
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
  //method to update a guest
  updateGuest: async function (req, res) {
    try {
      //get the ID from the request params
      const id = req.params.id;

      const updates={}

      updates["active"] = req.body.active

      //update guest data sent through the request
      
      if(Object.keys(updates).length === 0){
        res
        .status(404)
        .send({ message: "no data to update", statusCode: res.statusCode });
      }else{

      await guestModel.findByIdAndUpdate(id,updates)
    }
    
    res.json(await guestModel.findById(id));
    //res.status(200).send({ message: "guest updated", statusCode: res.statusCode });
    } catch (error) {
      console.log("failed to update guest: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
};



module.exports = guestController;