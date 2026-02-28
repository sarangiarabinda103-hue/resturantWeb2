const mongoose = require ("mongoose");


const mongoURL ='mongodb://localhost:27017/resturantWeb2'


mongoose.connect(mongoURL)

const db = mongoose.connection;


db.on('connected', ()=>{
    console.log('Connected to database Successfully');
});
db.on('error', (err)=>{
    console.log('Connected to database some error:',err);
});
db.on('disconnected', ()=>{
    console.log(' db is disconnected');
});

module.exports = db;