
import Access from "./access.js";
import UseerAccess from "./users.js";
import { ObjectId } from 'mongodb';

class ProductAccess extends Access {
    constructor() {
        super();
    }
    async read(id) {
        try {
            const product = await this.db.collection("products").findOne({ _id: new ObjectId(id) });
            console.log("read product at product access id:", id, product);
            return product;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async readAll(query = {}) {
        try {
            let products = this.db.collection("products").find(query);
            products = products.toArray();
            return products;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readCart(id) {
        try {
            let cart = await UseerAccess.getUser(id);
            cart = cart.cart;
            console.log("read cart at product access", cart);
            
            const productPromises = cart.map(cartId => 
                this.read(cartId.id).then(product => ({
                    id: product._id,
                    title: product.name,
                    data: product.description,
                    price: product.price,
                    category: product.category,
                    pic: product.pic,
                    quantity: cartId.quantity
                }))
            );
            
            const products = await Promise.all(productPromises);
            console.log("read cart at product access", products);
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    

    async create(product) {
        try {
            const newProduct = await this.db.collection("products").insertOne({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                pic: product.pic,
                quantity: product.quantity
            });
            return newProduct;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async update(product) {
        try {
            const updatedProduct = await this.db.collection("products").update(product, {
                where: { id: product.id }
            });
            return updatedProduct;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async updateCart(product, username, add = 1) {
        try {
            let cart = await UseerAccess.getUser(username);
            cart = cart.cart;
            console.log("cart at product access", cart);
            console.log("cart.some at product access", cart.some(item => item.id == product.id));
            if (!add) {// minus or delete
                cart.some(item => item.id == product.id && (add === -1 && item.quantity > 1)) ?
                    cart.forEach(item => { if (item.id == product.id) item.quantity-- }) :
                    cart = cart.filter(item => item.id !== product.id);
            }
            else {
                cart.some(item => item.id == product.id) ?
                    cart.forEach(item => { if (item.id == product.id) item.quantity++ }) :
                    cart.push({ id: product.id, quantity: 1 });
            }
            await UseerAccess.update(username, { cart: [...cart] });
            return this.readCart(username);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            await this.db.collection("products").destroy({
                where: { id: id }
            });
            return { message: "product deleted" };
        }
        catch (error) {
            throw new error(error.message);
        }
    }
}

export default ProductAccess = new ProductAccess();