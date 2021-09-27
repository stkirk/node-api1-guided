// IMPORTS AT THE TOP
const express = require('express') // import express from 'express'
const Dog = require('./dog-model') // relative paths to import modules
// import Dog from './dog-model') // ES6 modules!! instead of commonjs

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
server.get('/api/dogs/:id', async (req, res) => {
  try {
    const { id } = req.params
    const dog = await Dog.findById(id)
    if (!dog) {
      res.status(404).json({
        message: `dog with id ${id} does not exist!`
      })
    } else {
      res.status(200).json(dog)
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      customMessage: 'something horrible happened while getting dog by id'
    })
  }
})
// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get('/api/dogs', async (req, res) => {
  try {
    // take a trip to the database using a helper function
    const dogs = await Dog.findAll() // this funct returns promise!!!
    res.status(200).json(dogs) // without this client is left hanging!
  } catch (err) {
    // handle the error here (so app doesn't crash)
    res.status(500).json({
      message: err.message,
      customMessage: 'something horrible happened while getting dogs'
    })
  }
})
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', async (req, res) => {
  try {
    const { name, weight } = req.body
    if (!name || !weight) {
      res.status(400).json({
        message: 'new dogs need name and weight'
      })
    } else {
      const newDog = await Dog.create({ name, weight })
      res.status(200).json(newDog)
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      customMessage: 'something horrible happened while creating dog'
    })
  }
})
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', async (req, res) => {
  try {
    const { name, weight } = req.body
    const { id } = req.params

    if (!name || !weight) {
      res.status(400).json({
        message: 'supply name and weight to update dog'
      })
    } else {
      const updatedDog = await Dog.update(id, { name, weight})
      if (!updatedDog) {
        res.status(404).json({
          message: `no dog with id ${id}`
        })
      } else {
        res.json(updatedDog)
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      customMessage: 'something horrible happened while updating dog'
    })
  }
})
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', async (req, res) => {
  try {
    const deletedDog = await Dog.delete(req.params.id)
    console.log(deletedDog)
    if (!deletedDog) {
      res.status(404).json({
        message: `dog with id ${req.params.id} does not exist`
      })
    } else {
      res.json(deletedDog)
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      customMessage: 'something horrible happened while deleting dog'
    })
  }
})

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server // export default server
