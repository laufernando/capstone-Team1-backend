const sizeModel = require("../models/size.model");

//build our controller that will have our CRUD and other methods for size
const sizeController = {
    //method to create a new size
    createSize: async function (req, res) {
      try {
        //store user data sent through the request
        const size = req.body;
  
        
        let newSize= await sizeModel.create(size);
  
        //return the newly created size
        res.status(201).json(await sizeModel.findById(newSize._id));
      } catch (error) {
        //handle errors creating size
        console.log("failed to create newSize: " + error);
        res.status(400).json({
          message: error.message,
          statusCode: res.statusCode,
        });
      }
    },
    async getSize(req, res) {
      //create base query
      let query = {};
      let allSize;

  
      //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
      try {
        if (req.query.busqueda) {
          const regex = new RegExp(`.*${req.query.busqueda}.*$`, "i");
          query.size = { $regex: regex };
          allSize = await sizeModel.find(query);
        }else{
          allSize = await sizeModel.find();
        }

        //return all the sizes that we found in JSON format
        res.json(allSize);
      } catch (error) {
        console.log("error getting size: " + error);
        res.status(400).json({
          message: error.message,
          statusCode: res.statusCode,
        });
      }     
    },
 
    deleteSize: async function (req, res, next) {
        try {
          //get the user email from the request params
          const id = req.params.id;
    
          //try to find our user by the email provided in the request params
          const size = await sizeModel.findById(id);
    
          //update the user if we found a match and save or return a 404
          if (size) {
            await size.deleteOne(size, function(err, obj) {
              if (err) throw err
            })
          } else {
            res
              .status(404)
              .send({ message: "size not found", statusCode: res.statusCode });
          }
          res.status(200).send({ message: "size deleted", statusCode: res.statusCode });
        } catch (error) {
          console.log("failed to delete size: " + error);
          res.status(400).json({
            message: error.message,
            statusCode: res.statusCode,
          });
        }
      },

  };
  
  
  
  module.exports = sizeController;