//Import our model so we can us it to interact with the realated data in MongoDB
const Sneaker = require("../models/sneaker.model");

const FileSneaker = require("../models/file.model");

const multer = require("multer");
const uuid = require('uuid').v4;
const path = require('path');

// Función para renombrar el archivo cargado con Multer
const renameFile = function(req, file, cb) {
  const ext = path.extname(file.originalname);
  const newFileName = uuid() + ext;
  cb(null, newFileName);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: renameFile
});
const upload = multer({ storage: storage }).single('file');


//build our controller that will have our CRUD and other methods for our users
const sneakerController = {
  //method to get all users using async/await syntax
  async getSneaker(req, res) {
    //create base query
    let query = {};

    //if firstName filter appears in query parameters then modify the query to do a fuzzy search
    if (req.query.busqueda) {
      const regex = new RegExp(`.*${req.query.busqueda}.*$`, "i");
      query.marca = { $regex: regex };
      //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
      try {
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let allSneakers = await Sneaker.find(query);
        console.log(allSneakers);
        //return all the users that we found in JSON format
        res.json(allSneakers);
      } catch (error) {
        console.log("error getting sneakers: " + error);
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
        res.status(400).json({
          message: error.message,
          statusCode: res.statusCode,
        });
      }     
    }else{
      /*using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails */
      try {
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let allSneakers = await Sneaker.find();
        console.log(allSneakers);
        //return all the users that we found in JSON format
        res.json(allSneakers);
      } catch (error) {
        console.log("error getting all sneakers: " + error);
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
        res.status(400).json({
          message: error.message,
          statusCode: res.statusCode,
        });
      }
    }
  },
  //method to get all users using async/await syntax
  getSneakerId: async function (req, res) {
    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
      //get the email address of the user from the url parameters
      const sneakerId = req.params.id;

      //use our model to find the user that match a query.
      //{email: some@email.com} is the current query which really mean find the user with that email
      //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
      let foundSneaker = await Sneaker.findById(req.params.id);

      //if we found the user, return that user otherwise return a 404
      if (foundSneaker) {
        res.json(foundSneaker);
      } else {
        res.status(404).send({
          status: res.statusCode,
          message: "Sneaker Not Found!",
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
  //method to create a new sneaker
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
  //method to update a user
  updateSneaker: async function (req, res, next) {
    try {
      //get the user email from the request params
      const id = req.params.id;

      //store user data sent through the request
      const newSneakerData = req.body;

      //try to find our user by the email provided in the request params
      const sneaker = await Sneaker.findById(id);

      //update the user if we found a match and save or return a 404
      if (sneaker) {
        Object.assign(sneaker, newSneakerData);
        await sneaker.save();
      } else {
        res
          .status(404)
          .send({ message: "sneaker not found", statusCode: res.statusCode });
      }

      //respond with updated user
      res.json(await Sneaker.findById(sneaker._id));
    } catch (error) {
      console.log("failed to update sneaker: " + error);
      res.status(400).json({
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  },
  //method to update a user
  deleteSneaker: async function (req, res, next) {
    try {
      //get the user email from the request params
      const id = req.params.id;

      //store user data sent through the request
      const delSneakerData = req.body;

      //try to find our user by the email provided in the request params
      const sneaker = await Sneaker.findById(id);

      //update the user if we found a match and save or return a 404
      if (sneaker) {
        await sneaker.deleteOne(sneaker, function(err, obj) {
          if (err) throw err
        })
      } else {
        res
          .status(404)
          .send({ message: "sneaker not found", statusCode: res.statusCode });
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
    //method to create a new sneaker
    uploadFile: async function (req, res) {
      try {
        upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
            // Si se produce un error al cargar el archivo
            console.log(err);
            res.status(500).send('Error al cargar el archivo');
          } else if (err) {
            // Si se produce un error inesperado
            console.log(err);
            res.status(500).send('Error inesperado');
          } else {
            // Si la carga del archivo fue exitosa

            const sneakerData = req.body;
            sneakerData.img=req.file.filename;

            //pass the sneaker to the create method of the User model
            let newSneaker = await Sneaker.create(sneakerData);

            let respSneaker = await Sneaker.findById(newSneaker._id);

            const serverName = req.hostname;
            const serverPort = req.app.get('port');

            respSneaker.img=`${serverName}:${serverPort}/public/uploads/${respSneaker.img}`;

            //return the newly created user
            res.status(201).json(respSneaker);

            console.log('Archivo cargado', req.file.filename);
      
          }
        });
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
