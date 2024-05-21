// //create mongo db database named D-home, with collections users, articles, comments, designs, products, passwordHashes
// //conect to the database
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
// const uri = process.env.MONGO_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('connected to mongo db');
//     //create users collection
//     const userSchema = new mongoose.Schema({
//         username: String,
//         email: String,
//         password: String,
//         friends: [String],
//         articles: [String],
//         designs: [String],
//         products: [String],
//         cart: [String],
//         saved: [String]
//     });
//     const User = mongoose.model('User', userSchema);
//     //create articles collection
//     const articleSchema = new mongoose.Schema({
//         title: String,
//         content: String,
        