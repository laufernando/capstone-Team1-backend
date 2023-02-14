//Import our model so we can us it to interact with the realated data in MongoDB
const User = require("../models/user.model");

//build our controller that will have our CRUD and other methods for our users
const userController = {
  //method to get all users using async/await syntax
  async getUsers(req, res) {
    //create base query
    let query = {};

    //if firstName filter appears in query parameters then modify the query to do a fuzzy search
    if (req.query.firstName) {
      const regex = new RegExp(`.*${req.query.firstName}.*$`, "i");
      query.firstName = { $regex: regex };
    }

    //if lastName filter appears in query parameters then modify the query to do a fuzzy search
    if (req.query.lastName) {
      const regex = new RegExp(`.*${req.query.lastName}.*$`, "i");
      query.lastName = { $regex: regex };
    }

    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
      //use our model to find users that match a query.
      //{} is the current query which really mean find all the users
      //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
      let allUsers = await User.find(query);
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
  createUser: async function (req, res) {
    try {
      //store user data sent through the request
      const userData = req.body;

      //pass the userData to the create method of the User model
      let newUser = await User.create(userData);

      //return the newly created user
      res.status(201).json(await User.findById(newUser._id));
    } catch (error) {
      //handle errors creating user
      console.log("failed to create user: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
  //method to update a user
  updateUser: async function (req, res, next) {
    try {
      //get the user email from the request params
      const email = req.params.email;

      //store user data sent through the request
      const newUserData = req.body;

      //try to find our user by the email provided in the request params
      const user = await User.findOne({ email: email });

      //update the user if we found a match and save or return a 404
      if (user) {
        Object.assign(user, newUserData);
        await user.save();
      } else {
        res
          .status(404)
          .send({ message: "User not found", statusCode: res.statusCode });
      }

      //respond with updated user
      res.json(await User.findById(user._id));
    } catch (error) {
      console.log("failed to update user: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
  //method to get all users using async/await syntax
  getUser: async function (req, res) {
    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
      //get the email address of the user from the url parameters
      const userEmail = req.params.email;

      //use our model to find the user that match a query.
      //{email: some@email.com} is the current query which really mean find the user with that email
      //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
      let foundUser = await User.findOne({ email: userEmail });

      //if we found the user, return that user otherwise return a 404
      if (foundUser) {
        res.json(foundUser);
      } else {
        res.status(404).send({
          status: res.statusCode,
          message: "User Not Found!",
        });
      }
    } catch (error) {
      console.log("error getting user: " + error);
      //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find the user
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
};

module.exports = userController;
