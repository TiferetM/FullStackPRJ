// Import required modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { User, Article, Comment, Design, Product, PasswordHash, Fallower, Role } from './create.js';

// Set up __dirname in ESM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
dotenv.config({ path: `${__dirname}/../.env` });

// Connect to MongoDB
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the .env file");
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Initialize data
  try {
    const guest = new User({
      username: "guest",
      email: null,
      profilePic: "guest.png",
      role: "guest",
      staredArticles: [],
      staredDesigns: [],
      staredProducts: [],
      cart: [],
      saved: []
    });
    await guest.save();

    const guestHash = new PasswordHash({
      username: "guest",
      salt: 789,
      passwordHash: "w3l0v3gu3sts"
    });
    await guestHash.save();

    const registeredPaths = [
      { path: '/:id_u/articles', method: 'POST' },
      { path: '/:id_u/comments', method: 'POST' },
      { path: '/:id_u/designs', method: 'POST' },
      { path: '/:id_u/cart', method: 'GET' },
      { path: '/:id_u/cart/:id_p', method: 'PUT' },
      { path: '/:id_u', method: 'DELETE' },
      { path: '/:id_u/fallow', method: 'POST' },
      { path: '/:id_u/confirm', method: 'PUT' }
    ];

    const adminPaths = [
      { path: '/:id_u/products', method: 'POST' },
      { path: '/:id_u/products/:id_p', method: 'PUT' },
      { path: '/:id_u/products/:id_p', method: 'DELETE' },
      { path: '/:id_u', method: 'DELETE' },
      { path: '/:id_u/products/:id_p', method: 'PUT' }
    ];

    const everyonePaths = [
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
      { path: '/:id_u/comments', method: 'GET' },
      { path: "/:id_u/products/:id_p/img", method: 'GET'},
      { path: "/:id_u/users/:id_u", method: 'GET'},
      { path: "/:id_u/avatar/:id_a", method: 'GET'}
    ];

    const ownerPaths = [
      { path: '/:id_u/articles/:id_a', method: 'PUT' },
      { path: '/:id_u/articles/:id_a', method: 'DELETE' },
      { path: '/:id_u/designs/:id_d', method: 'PUT' },
      { path: '/:id_u/designs/:id_d', method: 'DELETE' },
      { path: '/:id_u/comments/:id_c', method: 'PUT' },
      { path: '/:id_u/comments/:id_c', method: 'DELETE' },
      { path: '/:id_u', method: 'PUT' }
    ];

    await Promise.all([
      ...registeredPaths.map(async path => {
        const role = new Role({ path: path.path, method: path.method, role: 'registered' });
        await role.save();
      }),
      ...adminPaths.map(async path => {
        const role = new Role({ path: path.path, method: path.method, role: 'admin' });
        await role.save();
      }),
      ...everyonePaths.map(async path => {
        const role = new Role({ path: path.path, method: path.method, role: 'everyone' });
        await role.save();
      }),
      ...ownerPaths.map(async path => {
        const role = new Role({ path: path.path, method: path.method, role: 'owner' });
        await role.save();
      })
    ]);

    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  } finally {
    mongoose.connection.close();
  }
});
