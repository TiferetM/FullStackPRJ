//conect to the database
import mongoose from 'mongoose';

// Define schemas and models
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  profilePic: String,
  role: String,
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
  author: String,
  pic: String
});
ArticleSchema.index({ title: 1, author: 1 }, { unique: true });
const Article = mongoose.model('Articles', ArticleSchema);

const CommentSchema = new mongoose.Schema({
  content: String,
  author: String,
  baseItem: String
});
const Comment = mongoose.model('Comments', CommentSchema);

const DesignSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  pic: String
});
DesignSchema.index({ title: 1, author: 1 }, { unique: true });
const Design = mongoose.model('Designs', DesignSchema);

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  pic: String,
  quantity: Number
});
ProductSchema.index({ name: 1, category: 1 }, { unique: true });
const Product = mongoose.model('Products', ProductSchema);

const PasswordHashSchema = new mongoose.Schema({
  username: String,
  salt: Number,
  passwordHash: String
});
const PasswordHash = mongoose.model('PasswordHash', PasswordHashSchema);

const FallowersSchema = new mongoose.Schema({
  username: String,
  fallowes: String
});
FallowersSchema.index({ username: 1, fallowes: 1 }, { unique: true });
const Fallower = mongoose.model('Fallowers', FallowersSchema);

const RoleSchema = new mongoose.Schema({
  path: String,
  method: String,
  role: String
});
const Role = mongoose.model('Roles', RoleSchema);

export { User, Article, Comment, Design, Product, PasswordHash, Fallower, Role };
