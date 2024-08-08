const mongoose =require('mongoose')

const userschema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const usermodel = mongoose.model("users",userschema)
module.exports= usermodel