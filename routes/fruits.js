// FRUITS CRUD Routes
const express = require('express')
const router = express.Router()
const Fruit = require('../models/fruit')

// Index route = GET
router.get('/', async (req, res)=> {
    const allFruits = await Fruit.find({})
          res.json(allFruits)
        })

//Show GET ID get individual fruit
router.get('/:id', async (req, res) => {
    try {
    const oneFruit = await Fruit.findById(req.params.id)
    res.json(oneFruit)
} catch (error) {
    res.status(500).json({msg: "Whoops"})
    console.log(error)
}})

//New  - GET - Form

//Create - POST
router.post("/", async (req, res)=> {
    console.log(req.body)
    const newFruit = await Fruit.create(req.body)
    res.json(newFruit)
})

// Edit Route - GET FOrm

// Update - PUT/PATCH
router.put('/:id', async (req, res) => {
    const updateFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body)
    res.json(updateFruit)
})


//Destroy route - DELETE
router.delete('/:id', async (req, res) => {
    const deleteFruit = await Fruit.findByIdAndDelete(req.params.id)
    res.json(deleteFruit)
})


module.exports = router