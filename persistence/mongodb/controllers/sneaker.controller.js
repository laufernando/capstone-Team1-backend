//Import our model so we can us it to interact with the realated data in MongoDB
const Sneaker = require("../models/sneaker.model");

//build our controller that will have our CRUD and other methods for our users
const sneakerController = {
  //method to get all users using async/await syntax
  async getSneaker(req, res) {
    //create base query
    let query = {};

    /*using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails */
    try {
      //use our model to find users that match a query.
      //{} is the current query which really mean find all the users
      //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
      let allUsers = await Sneaker.find();
      console.log(allUsers);
      //return all the users that we found in JSON format
      res.json(allUsers);
    } catch (error) {
      console.log("error getting all users: " + error);
      //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
  //method to create a new user
  createSneaker: async function (req, res) {
    try {
      //store user data sent through the request
      const sneakerData = req.body;

      //pass the userData to the create method of the User model
      let newSneaker = await Sneaker.create(sneakerData);

      //return the newly created user
      res.status(201).json(await Sneaker.findById(newSneaker._id));
    } catch (error) {
      //handle errors creating user
      console.log("failed to create user: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
};

module.exports = sneakerController;
