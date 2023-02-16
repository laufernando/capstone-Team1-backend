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
    getPaymentById: async function (req, res) {
        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
    
          let payment = await paymentModel.findById(req.params.id);
    
          //if we found the user, return that user otherwise return a 404
          if (payment) {
            res.json(payment);
          } else {
            res.status(404).send({
              status: res.statusCode,
              message: "payment Not Found!",
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
    deletePayment: async function (req, res, next) {
        try {
          //get the user email from the request params
          const id = req.params.id;
    
          //try to find our user by the email provided in the request params
          const payment = await paymentModel.findById(id);
    
          //update the user if we found a match and save or return a 404
          if (payment) {
            await payment.deleteOne(payment, function(err, obj) {
              if (err) throw err
            })
          } else {
            res
              .status(404)
              .send({ message: "payment not found", statusCode: res.statusCode });
          }
          res.status(200).send({ message: "payment deleted", statusCode: res.statusCode });
        } catch (error) {
          console.log("failed to delete payment: " + error);
          res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
          });
        }
      },

  };
  
  
  
  module.exports = paymentController;