import mongoose from 'mongoose';
import dotenv from 'dotenv';

class Access {
    constructor() {
        //access to the mongo database
        //conect to the database
        //dotnev is used to hide the mongo uri
        //load the uri from the .env file
        dotenv.config();
        //connect to the database
        const uri = process.env.MONGO_URI;
        mongoose.connect(uri).then(() => console.log('connected to the database')).catch((error) => console.log(error));
        const db = mongoose.connection;
        //check if the connection is successful
        db.on('error', console.error.bind(console, 'connection error:'));
        //if the connection is successful, log the message
        this.db = db;
    }
}

export default Access;