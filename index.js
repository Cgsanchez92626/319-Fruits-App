require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const conn = require('./DB/conn')
const fruitRoutes = require('./routes/fruits')
const Fruit = require('./models/fruit')
const starterFruits = require('./DB/seed')
conn()   // Calling the connection function

// Middleware to use express react views
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.json())   // to allow usage of req.body
app.use('/api/fruits',fruitRoutes) 


// Routes
app.get('/',(req,res)=> {
    res.send('Home route!')
})

app.get('/fruits/seed', async (req, res) => {
    try {
        await Fruit.deleteMany({})   // Delete everthing
        await Fruit.create(starterFruits)     // Load Seed Data
        res.json(starterFruits)
    } catch (error) {
        console.log(`Something went wrong loading seed data ${error.message}`)
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
});