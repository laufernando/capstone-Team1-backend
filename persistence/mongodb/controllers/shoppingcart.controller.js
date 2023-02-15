//Import our model so we can us it to interact with the realated data in MongoDB
const ShoppingCart = require("../models/shoppingcart.model");

//build our controller that will have our CRUD and other methods for our users
const shoppingcartController = {
  //method to create a new sneaker
  createShoppingCart: async function (req, res) {
    try {
      //store user data sent through the request
      const shoppingCart = req.body;

      //pass the userData to the create method of the User model
      let newShoppingCart= await ShoppingCart.create(shoppingCart);

      //return the newly created user
      res.status(201).json(await ShoppingCart.findById(newShoppingCart._id));
    } catch (error) {
      //handle errors creating user
      console.log("failed to create ShoppingCart: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },  
  getProductById: async function (req, res) {
    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        

      //use our model to find the user that match a query.
      //{email: some@email.com} is the current query which really mean find the user with that email
      //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
      let product = await ShoppingCart.findById(req.params.id);

      //if we found the user, return that user otherwise return a 404
      if (product) {
        res.json(product);
      } else {
        res.status(404).send({
          status: res.statusCode,
          message: "Product Not Found!",
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
  getProductsByUser: async function (req, res) {
    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
      //use our model to find the user that match a query.
      //{email: some@email.com} is the current query which really mean find the user with that email
      //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
      let product = await ShoppingCart.find({user_id:req.params.user_id});

      //if we found the user, return that user otherwise return a 404
      if (product) {
        res.json(product);
      } else {
        res.status(404).send({
          status: res.statusCode,
          message: "Product Not Found!",
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
  deleteProductById: async function (req, res, next) {
    try {
      //try to find our user by the email provided in the request params
      const product = await ShoppingCart.findByIdAndDelete(req.params.id);
      //update the user if we found a match and save or return a 404
      if (product) {
        res.json(product);
      } else {
        res
          .status(404)
          .send({ message: "Product not found", statusCode: res.statusCode });
      }
      res.status(200).send({ message: "sneaker delete", statusCode: res.statusCode });
    } catch (error) {
      console.log("failed to update sneaker: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
  updateProduct: async function (req, res, next) {
    try {
      //store user data sent through the request
      const newproduct = req.body;

      //try to find our user by the email provided in the request params
      const product = await ShoppingCart.findById(req.params.product_id);

      //update the user if we found a match and save or return a 404
      if (product) {
        Object.assign(product, newproduct);
        await product.save();
      } else {
        res
          .status(404)
          .send({ message: "product not found", statusCode: res.statusCode });
      }

      //respond with updated user
      res.json(await ShoppingCart.findById(product._id));
    } catch (error) {
      console.log("failed to update product: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  }
};



module.exports = shoppingcartController;
