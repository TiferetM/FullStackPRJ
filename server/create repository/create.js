//conect to the database
const mongoose = require('mongoose');
//dotnev is used to hide the mongo uri
const dotenv = require('dotenv');
//load the uri from the .env file
dotenv.config();
//connect to the database
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
//check if the connection is successful
db.on('error', console.error.bind(console, 'connection error:'));
//if the connection is successful, log the message
db.once('open', () => {
    console.log('connected to mongo db');
    //create users collection
    const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        profilePic: String,
        friends: [Array],
        articles: [Array],
        designs: [Array],
        products: [Array],
        cart: [Array],
        saved: [Array]
    });
    //create articles collection
    const articleSchema = new mongoose.Schema({
        title: String,
        content: String,
        //auther is defined as a string for now, but it should be a reference to the user collection
        auther: String,
        pic: String
    });
    //create comments collection
    const commentSchema = new mongoose.Schema({
        content: String,
        auther: String,
        baseItem: String
    });
    //create designs collection
    const designSchema = new mongoose.Schema({
        title: String,
        content: String,
        auther: String,
        pic: String
    });
    //create products collection
    const productSchema = new mongoose.Schema({
        title: String,
        data: String,
        auther: String,
        pic: String
    });
    //create passwordHashes collection
    const passwordHashSchema = new mongoose.Schema({
        username: String,
        passwordHash: String
    });
});