const mongoose = require('mongoose');
const validator = require('validator');

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: ' >>>> Fname is required',
        trim: true
    },
    lname: {
        type: String,
        required: ' >>>> Lname is required',
        trim: true
    },
    title: {
        type: String,
        required: [true, ' >>>> title is required'],
        enum: {
            values: ["Mr", "Mrs", "Miss"],
            message: ' >>>> Please Provide only :- Mr, Mrs, Miss'
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: ' >>>> Email is required',
        validate: [validator.isEmail, ' >>>> Please Provide Valid Email']
    },
    password: {
        type: String,
        tirm: true,
        required: ' >>>> Password is required'
    }
})

const AuthorModel = mongoose.model('AuthorModel', authorSchema);

module.exports = AuthorModel;