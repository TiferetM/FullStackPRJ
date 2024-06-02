import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Define models
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

    // Initialize data
    try {
        // Create users
        const user1 = new User({ username: 'user1', email: 'user1@example.com', profilePic: 'user1.jpg' });
        const user2 = new User({ username: 'user2', email: 'user2@example.com', profilePic: 'user2.jpg' });

        await user1.save();
        await user2.save();

        // Create articles
        const article1 = new Article({ title: 'Article 1', content: 'Content of article 1', author: user1._id, pic: 'article1.jpg' });
        const article2 = new Article({ title: 'Article 2', content: 'Content of article 2', author: user2._id, pic: 'article2.jpg' });

        await article1.save();
        await article2.save();

        // Create comments
        const comment1 = new Comment({ content: 'Great article!', author: user1._id, baseItem: 'article1' });
        const comment2 = new Comment({ content: 'Thanks for the info!', author: user2._id, baseItem: 'article2' });

        await comment1.save();
        await comment2.save();

        // Create designs
        const design1 = new Design({ title: 'Design 1', content: 'Content of design 1', author: user1._id, pic: 'design1.jpg' });
        const design2 = new Design({ title: 'Design 2', content: 'Content of design 2', author: user2._id, pic: 'design2.jpg' });

        await design1.save();
        await design2.save();

        // Create products
        const product1 = new Product({ title: 'Product 1', data: 'Data of product 1', price: 10, category: 'Category 1', pic: 'product1.jpg', quantity: 100 });
        const product2 = new Product({ title: 'Product 2', data: 'Data of product 2', price: 20, category: 'Category 2', pic: 'product2.jpg', quantity: 200 });

        await product1.save();
        await product2.save();

        // Create password hashes
        const passwordHash1 = new PasswordHash({ username: 'user1', salt: 123, passwordHash: 'hash1' });
        const passwordHash2 = new PasswordHash({ username: 'user2', salt: 456, passwordHash: 'hash2' });

        await passwordHash1.save();
        await passwordHash2.save();

        // Create friendships
        const friendship1 = new Friend({ username: user1._id, friend: user2._id });

        await friendship1.save();

        console.log('Data initialized successfully');
    } catch (error) {
        console.error('Error initializing data:', error);
    } finally {
        mongoose.connection.close();
    }
});
