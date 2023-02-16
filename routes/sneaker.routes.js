const express = require('express');
const router = express.Router();


//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const sneakerController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/sneaker.controller`
);

//get route to return all users (requires auth)
router.get("/", sneakerController.getSneaker);

//get route to return a specific users (requires auth)
router.get("/:id", sneakerController.getSneakerId);

//post route to create a user (user registration)
//router.post("/", sneakerController.createSneaker);

router.patch("/:id", sneakerController.updateSneaker);

router.delete("/:id", validateJwtMiddleware, sneakerController.deleteSneaker);

router.post("/", sneakerController.uploadFile);

router.put("/", sneakerController.updateUploadFile);

module.exports = router;
