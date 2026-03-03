const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
// 1. Use a regular function here to ensure 'this' refers to the document
// Remove 'next' from the parameters
personSchema.pre('save', async function() { 
    const person = this;

    if (!person.isModified('password')) return; // Just return, don't call next()

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);
        person.password = hashPassword;
        // No next() call needed here
    } catch (error) {
        throw error; // Throwing the error will stop the save process
    }
});

// 2. Use a regular function here as well
personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // 'this.password' refers to the hashed password in the DB
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const Person = mongoose.model('Person', personSchema);
module.exports = Person;