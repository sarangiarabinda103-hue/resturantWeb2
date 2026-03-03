const mongoose = require("mongoose");


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Mongodb connected successfully')
    } catch (error) {
        console.log("Mongidb connection failed",error.message);
        process.exit(1);
        
    }
}

module.exports = connectDB;

