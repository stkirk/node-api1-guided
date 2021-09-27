// IMPORTS AT THE TOP
const express = require('express') // import express from 'express'

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json()) // teaches express to parse request bodies as JSON

// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get('/', (req, res) => {
  console.log(`this is a ${req.method} request`)
  res.json({ message: 'hellow, world! Web 46 rulez!' })
})

// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get('/api/dogs', async (req, res) => {
  try {
    // anything crashes here...
    // take a trip to the database using a helper function
  } catch (err) {
    // handle the error here (so app doesn't crash)
  }
})
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server // export default server
