// STEP 1 - IMPORTS AT THE TOP
const express = require("express"); //no leading /, require knows to look in node modules folder for express

//importing all the helper function modules from dog-model
// capitalize models in the singular
const Dog = require("./dog-model.js");
//could import each helper one by one by destructuring
// const { findAll, findById } = require('./dog-model')

// STEP 2 - INSTANCE OF EXPRESS APP - invoke express as a function to get an instance of a webserver
const server = express();

// STEP 3 -  GLOBAL MIDDLEWARE
server.use(express.json()); //teaches express to parse the bodies of requests as JSON, gives us access to (req.body)

// STEP 7 - MAKE THE ENDPOINTS, in express order matters so we want to order from most specific endpoint to least specific

// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get("/api/dogs/:id", (req, res) => {
  // id parameter needed to pass into findById method, and can be pulled from the req object
  // req.params is an object that holds all the variable pieces of the URL
  const id = req.params.id;
  Dog.findById(id)
    .then((dog) => {
      if (!dog) {
        //for the situation where the dog doesn't exist
        res.status(400).json({ message: `Dog ${id} does not exist` });
      } else res.json(dog); //default status code is 200 so don't need to specify it
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get("/api/dogs", (req, res) => {
  //first test to make sure the request works on postman then move into the real response but be careful never to respond more than once for real
  // res.status(200).json({ message: "GET /api/dogs works" })

  Dog.findAll()
    .then((dogs) => {
      //console.logs show up in the nodemon area when we hit the endpoint with postman
      console.log(dogs);
      res.status(200).json(dogs);
      // read the requirements of what needs to be returned, could need a message included or put dogs on its own property
      // EX res.status(200).json({ message: "here are the dogs", dogs })
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
//Something wrong here**************
server.post("/api/dogs", (req, res) => {
  // payload for a new dog is pulled from req.body
  const newDog = req.body;
  console.log("new dog : ", newDog.name, newDog.weight);

  // validate req for necessary 'things', send appropriate response
  if (!newDog.name || !newDog.weight) {
    res.status(422).json({ message: "Dog needs a name and weight" });
    // 422 means request received and understood but request doesn't meet necessary criteria
  } else
    Dog.create(newDog)
      .then((dog) => {
        //throw error to test the .catch
        //   throw new Error("AHHHH I'm an error")
        res.status(201).json(dog);
        // 201 is for creating new assets
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
});

// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put("/api/dogs/:id", async (req, res) => {
  // check what update method needs for arguments
  const { id } = req.params;
  const changes = req.body;

  // different way to deal with async functions (don't forget async keyword before function above):

  try {
    if (!changes.name || !changes.weight) {
      res.status(422).json({ message: "Dog name and weight required" });
    } else {
      //store resolved promise in a variable
      const updatedDog = await Dog.update(id, changes);
      //   console.log("Database change to dog: ", updatedDog);
      if (!updatedDog) {
        res.status(404).json({ message: "Dog doesn't exist" });
      } else res.status(200).json(updatedDog);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete("/api/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDog = await Dog.delete(id);
    if (!deletedDog) {
      res.status(404).json({ message: "Dog doesn't exist" });
    } else {
      res.status(200).json(deletedDog);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// STEP 4 - [GET] / (Hello World endpoint)
// * denotes a response to any request to the server, usually used as last resort for a response to a request to an endpoint that doesn't exist - 404 status
// use means any type of request
server.use("*", (req, res) => {
  //here we do what we want with the request from the client
  // req and res are 2 objects
  res.status(404).json({ message: "404 Resource Not Found" });
});

// STEP 5 - EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;
