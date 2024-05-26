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
const mongoose = require('mongoose');
// Define the schemas and models
db.once('open', () => {
    console.log('Connected to MongoDB');

    // Define user schema and model
    mongoose.model('Users', new mongoose.Schema({
        username: String,
        email: String,
        profilePic: String,
        friends: [Array],
        articles: [Array],
        designs: [Array],
        products: [Array],
        cart: [Array],
        saved: [Array]
    }));

    // Define article schema and model
    mongoose.model('Articles', new mongoose.Schema({
        title: String,
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Reference to Users collection
        pic: String
    }));

    // Define comment schema and model
    mongoose.model('Comments', new mongoose.Schema({
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Reference to Users collection
        baseItem: String
    }));

    // Define design schema and model
    mongoose.model('Designs', new mongoose.Schema({
        title: String,
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Reference to Users collection
        pic: String
    }));

    // Define product schema and model
    mongoose.model('Products', new mongoose.Schema({
        title: String,
        data: String,
        price: Number,
        category: String,
        pic: String
    }));

    // Define passwordHash schema and model
    mongoose.model('PasswordHashs', new mongoose.Schema({
        username: String,
        salt: Number,
        passwordHash: String
    }));

});
