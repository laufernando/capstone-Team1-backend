const paymentModel = require("../models/payment.model");

//build our controller that will have our CRUD and other methods for gender
const paymentController = {
    //method to create a new gender
    createPayment: async function (req, res) {
      try {
        //store user data sent through the request
        const payment = req.body;
  
        
        let newPayment= await paymentModel.create(payment);
  
        //return the newly created gender
        res.status(201).json(await paymentModel.findById(newPayment._id));
      } catch (error) {
        //handle errors creating gender
        console.log("failed to create newPayment: " + error);
        res.status(400).json({
          message: error.message,
          statusCode: res.statusCode,
        });
      }
    },
  };
  
  
  
  module.exports = paymentController;