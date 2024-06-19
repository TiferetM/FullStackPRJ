import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const uri = process.env.MONGO_URI;
console.log(uri);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
  console.log('Connected to MongoDB');

  const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    profilePic: String,
    staredArticles: [Array],
    staredDesigns: [Array],
    staredProducts: [Array],
    cart: [Array],
    saved: [Array]
  });
  const User = mongoose.model('Users', UserSchema);

  const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    pic: String
  });
  const Article = mongoose.model('Articles', ArticleSchema);

  const CommentSchema = new mongoose.Schema({
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    baseItem: String
  });
  const Comment = mongoose.model('Comments', CommentSchema);

  const DesignSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    pic: String
  });
  const Design = mongoose.model('Designs', DesignSchema);

  const ProductSchema = new mongoose.Schema({
    title: String,
    data: String,
    price: Number,
    category: String,
    pic: String,
    quantity: Number
  });
  const Product = mongoose.model('Products', ProductSchema);

  const PasswordHashSchema = new mongoose.Schema({
    username: String,
    salt: Number,
    passwordHash: String
  });
  const PasswordHash = mongoose.model('PasswordHashs', PasswordHashSchema);

  const FriendSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    friend: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
  });
  const Friend = mongoose.model('friends', FriendSchema);

  const RoleSchema = new mongoose.Schema({
    path: String,
    method: String,
    role: String
  });
  const Role = mongoose.model('roles', RoleSchema);

  try {
    const registeredPathes = [
      { path: '/:id_u/articles', method: 'POST' },
      { path: '/:id_u/comments', method: 'POST' },
      { path: '/:id_u/designs', method: 'POST' },
      { path: '/:id_u/cart', method: 'GET' },
      { path: '/:id_u/cart/:id_p', method: 'PUT' },
      { path: '/:id_u', method: 'DELETE' }
    ];

    await Promise.all(registeredPathes.map(async (path) => {
      const role = new Role({ path: path.path, method: path.method, role: 'registered' });
      await role.save();
    }));

    const adminPathes = [
      { path: '/:id_u/products', method: 'POST' },
      { path: '/:id_u/products/:id_p', method: 'PUT' },
      { path: '/:id_u/products/:id_p', method: 'DELETE' },
      { path: '/:id_u', method: 'DELETE' }
    ];

    await Promise.all(adminPathes.map(async (path) => {
      const role = new Role({ path: path.path, method: path.method, role: 'admin' });
      await role.save();
    }));

    const everyonePathes = [
      { path: '/:id_u/articles', method: 'GET' },
      { path: '/:id_u/articles/:id_a', method: 'GET' },
      { path: '/:id_u/articles/?q', method: 'GET' },
      { path: '/:id_u/designs', method: 'GET' },
      { path: '/:id_u/designs/:id_d', method: 'GET' },
      { path: '/:id_u/products', method: 'GET' },
      { path: '/:id_u/products/:id_p', method: 'GET' },
      { path: '/:id_u/products/?q', method: 'GET' },
      { path: '/:id_u', method: 'GET' },
      { path: '/:id_u/designs/?q', method: 'GET' },
      { path: '/:id_u/comments', method: 'GET' }
    ];

    await Promise.all(everyonePathes.map(async (path) => {
      const role = new Role({ path: path.path, method: path.method, role: 'everyone' });
      await role.save();
    }));

    const ownerPathes = [
      { path: '/:id_u/articles/:id_a', method: 'PUT' },
      { path: '/:id_u/articles/:id_a', method: 'DELETE' },
      { path: '/:id_u/designs/:id_d', method: 'PUT' },
      { path: '/:id_u/designs/:id_d', method: 'DELETE' },
      { path: '/:id_u/comments/:id_c', method: 'PUT' },
      { path: '/:id_u/comments/:id_c', method: 'DELETE' },
      { path: '/:id_u', method: 'PUT' }
    ];

    await Promise.all(ownerPathes.map(async (path) => {
      const role = new Role({ path: path.path, method: path.method, role: 'owner' });
      await role.save();
    }));

    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  } finally {
    mongoose.connection.close();
  }
});

// //conect to the database
// import mongoose from 'mongoose';
// //dotnev is used to hide the mongo uri
// import dotenv from 'dotenv';
// //path is used to get the path of the .env file
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

// // הגדרת __dirname בסביבת ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // טוען קובץ .env
// dotenv.config({ path: `${__dirname}/../.env` });

// // Connect to MongoDB
// const uri = process.env.MONGO_URI;
// console.log(uri);
// mongoose.connect(uri)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB', err));

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', async () => {
//     console.log('Connected to MongoDB');

//     // Define models
//     const UserSchema = new mongoose.Schema({
//         username: String,
//         email: String,
//         profilePic: String,
//         staredArticles: [Array],
//         staredDesigns: [Array],
//         staredProducts: [Array],
//         cart: [Array],
//         saved: [Array]
//     });
//     const User = mongoose.model('Users', UserSchema);

//     const ArticleSchema = new mongoose.Schema({
//         title: String,
//         content: String,
//         author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
//         pic: String
//     });
//     const Article = mongoose.model('Articles', ArticleSchema);

//     const CommentSchema = new mongoose.Schema({
//         content: String,
//         author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
//         baseItem: String
//     });
//     const Comment = mongoose.model('Comments', CommentSchema);

//     const DesignSchema = new mongoose.Schema({
//         title: String,
//         content: String,
//         author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
//         pic: String
//     });
//     const Design = mongoose.model('Designs', DesignSchema);

//     const ProductSchema = new mongoose.Schema({
//         title: String,
//         data: String,
//         price: Number,
//         category: String,
//         pic: String,
//         quantity: Number
//     });
//     const Product = mongoose.model('Products', ProductSchema);

//     const PasswordHashSchema = new mongoose.Schema({
//         username: String,
//         salt: Number,
//         passwordHash: String
//     });
//     const PasswordHash = mongoose.model('PasswordHashs', PasswordHashSchema);

//     const FriendSchema = new mongoose.Schema({
//         username: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
//         friend: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
//     });
//     const Friend = mongoose.model('friends', FriendSchema);

//     const RoleSchema = new mongoose.Schema({
//         path: String,
//         method: String,
//         role: String
//     });
//     const Role = mongoose.model('roles', RoleSchema);

//     // Initialize data
//     try {
//         // Create guest user
//         // const guest = new User({ username: 'guest', email: null, profilePic: 'guest.jpg' });
//         // await guest.save();
//         // const guestHash = new PasswordHash({ username: 'guest', salt: 789, passwordHash: 'w3l0v3gu3sts' });
//         // await guestHash.save();

//         // Create roles path collection
//         const registeredPathes = [
//             {path: '/:id_u/articles', method: 'POST'},
//             {path: '/:id_u/comments', method: 'POST'},
//             {path: '/:id_u/designs', method: 'POST'},
//             {path: '/:id_u/cart', method: 'GET'},
//             {path: '/:id_u/cart/:id_p', method: 'PUT'},
//             {path: '/:id_u', method: 'DELETE'},
//         ];
//         registeredPathes.map(async (path) => {
//             const role = new Role({ path: path.path, method: path.method, role: 'registered' });
//             await role.save();
//         });

//         const adminPathes = [
//             {path: '/:id_u/products', method: 'POST'},
//             {path: '/:id_u/products/:id_p', method: 'PUT'},
//             {path: '/:id_u/products/:id_p', method: 'DELETE'},
//             {path: '/:id_u', method: 'DELETE'}
//         ];
//         adminPathes.map(async (path) => {
//             const role = new Role({ path: path.path, method: path.method, role: 'admin' });
//             await role.save();
//         });

//         const everyonePathes = [
//             {path: '/:id_u/articles', method: 'GET'},
//             {path: '/:id_u/articles/:id_a', method: 'GET'},
//             {path: '/:id_u/articles/?q', method: 'GET'},
//             {path: '/:id_u/designs', method: 'GET'},
//             {path: '/:id_u/designs/:id_d', method: 'GET'},
//             {path: '/:id_u/products', method: 'GET'},
//             {path: '/:id_u/products/:id_p', method: 'GET'},
//             {path: '/:id_u/products/?q', method: 'GET'},
//             {path: '/:id_u', method: 'GET'},
//             {path: '/:id_u/designs/?q', method: 'GET'},
//             {path: '/:id_u/comments', method: 'GET'}
//         ];
//         everyonePathes.map(async (path) => {
//             const role = new Role({ path: path.path, method: path.method, role: 'everyone' });
//             await role.save();
//         });

//         const ownerPathes = [
//             {path: '/:id_u/articles/:id_a', method: 'PUT'},
//             {path: '/:id_u/articles/:id_a', method: 'DELETE'},
//             {path: '/:id_u/designs/:id_d', method: 'PUT'},
//             {path: '/:id_u/designs/:id_d', method: 'DELETE'},
//             {path: '/:id_u/comments/:id_c', method: 'PUT'},
//             {path: '/:id_u/comments/:id_c', method: 'DELETE'},
//             {path: '/:id_u', method: 'PUT'}
//         ];
//         ownerPathes.map(async (path) => {
//             const role = new Role({ path: path.path, method: path.method, role: 'owner' });
//             await role.save();
//         });
//         console.log('Data initialized successfully');
//     } catch (error) {
//         console.error('Error initializing data:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// });
