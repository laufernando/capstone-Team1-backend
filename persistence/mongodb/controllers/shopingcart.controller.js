//Import our model so we can us it to interact with the realated data in MongoDB
const ShopingCart = require("../models/shopingcart.model");

//build our controller that will have our CRUD and other methods for our users
const shopingcartController = {
  //method to create a new sneaker
  createShopingCart: async function (req, res) {
    try {
      //store user data sent through the request
      const shopingCart = req.body;

      //pass the userData to the create method of the User model
      let newShopingCart= await ShopingCart.create(shopingCart);

      //return the newly created user
      res.status(201).json(await ShopingCart.findById(newShopingCart._id));
    } catch (error) {
      //handle errors creating user
      console.log("failed to create ShopingCart: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  }
};



module.exports = shopingcartController;
