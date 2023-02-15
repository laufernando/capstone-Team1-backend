const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const shoppingCartController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/shoppingcart.controller`
);

//post route to create a user (user registration)
router.post("/", shoppingCartController.createShoppingCart);
router.get("/:id", shoppingCartController.getProductById);
router.get("/product/:user_id", shoppingCartController.getProductsByUser);
router.delete("/product/:id", shoppingCartController.deleteProductById);
router.put("/product/:product_id", shoppingCartController.updateProduct);
module.exports = router;
