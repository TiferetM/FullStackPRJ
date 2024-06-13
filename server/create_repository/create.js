//conect to the database
import mongoose from 'mongoose';
//dotnev is used to hide the mongo uri
import dotenv from 'dotenv';
//path is used to get the path of the .env file
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// הגדרת __dirname בסביבת ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// טוען קובץ .env
dotenv.config({ path: `${__dirname}/../.env` });

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in the .env file");
}
//works great untill here
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const db = mongoose.connection;
//check if the connection is successful
db.on('error', console.error.bind(console, 'connection error:'));
//if the connection is successful, log the message
//const mongoose = require('mongoose');
// Define the schemas and models
db.once('open', () => {
    console.log('Connected to MongoDB');

    // Define user schema and model
    mongoose.model('Users', new mongoose.Schema({
        username: String,
        email: String,
        profilePic: String,
        staredArticles: [Array],
        staredDesigns: [Array],
        staredProducts: [Array],
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
        pic: String,
        quantity: Number
    }));

    // Define passwordHash schema and model
    mongoose.model('PasswordHashs', new mongoose.Schema({
        username: String,
        salt: Number,
        passwordHash: String
    }));

    mongoose.model('friends', new mongoose.Schema({
        username: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        friend: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    }));

    mongoose.model('roles', new mongoose.Schema({
        username: String,
        role: String
    }));
});
