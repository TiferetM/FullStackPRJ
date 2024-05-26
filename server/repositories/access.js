class access {
    constructor() {
        //access to the mongo database
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
        this.db = db;
    }
}

export default access = new access();