const express = require('express')
const app = express()
const passport = require('./auth')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleWare = passport.authenticate('local',{session:false})

app.get('/', function (req, res) {
    res.send('Hello World')
})   

const personRoutes = require ('./routes/personRoute')
app.use('/person',personRoutes);
const menuRoutes = require ('./routes/menuRouter');
app.use('/person',personRoutes);
app.use( '/menu' ,menuRoutes);
const connectDB = require('./db');
const Person = require('./models/Person');
connectDB();






app.listen(3000, () => {
    console.log('Server is running on port 3000')
})