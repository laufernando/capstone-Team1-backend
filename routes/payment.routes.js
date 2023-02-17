const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const paymentController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/payment.controller`
);

//post route to create a user (user registration)
router.post("/", paymentController.createPayment);
//router.get("/:id", paymentController.getPaymentById);
router.delete("/:id", paymentController.deletePayment);
router.get("/", paymentController.getPayment);


module.exports = router;