
import Access from "./access.js";

class ProductAccess extends Access {
    constructor() {
        super();
    }
    async read(id) {
        try {
            const product = await this.db.collection("products").findOne({ where: { id: id } });
            return product;
        }
        catch (error) {
            return { error: error.message };
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
            //natural join between products, cart and users, return the products
            const cart = this.db.collection("cart").aggregate([
                {
                    $match: { username: id }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "product",
                        foreignField: "_id",
                        as: "product_details"
                    }
                },
                {
                    $unwind: "$product_details"
                },
                {
                    //project the fields we want to return
                    $project: {
                        _id: 0,
                        prod_id: 1,
                        product_data: "$product_details.data",
                        product_pic: "$product_details.pic",
                        product_category: "$product_details.category",
                        product_quantity : 1,
                        product_title: "$product_details.title",
                        product_price: "$product_details.price"
                    }
                }
            ]);

            products = cart.toArray();
            products = products.map(product => {
                return {
                    id: product.prod_id,
                    title: product.product_title,
                    data: product.product_data,
                    price: product.product_price,
                    category: product.product_category,
                    pic: product.product_pic,
                    quantity: product.product_quantity
                }
            });
            //return the products only one kind of each product, and quantity is the sum of all the same products
            products = products.reduce((acc, current) => {
                //check if the product is already in the array
                const x = acc.find(item => item.id === current.id);
                if (!x) {
                    //if the product is not in the array, add it
                    return acc.concat([current]);
                } else {
                    //if the product is in the array, add the quantity
                    x.quantity += current.quantity;
                    return acc;
                }
            }, []);

            return products;
        }
        catch {
            return { error: error.message };
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

    async updateCart(product, add=true) {
        try {
            if (!add) {
                await this.db.collection("cart").destroy({
                    where: { product: product.id }
                });
                return { message: "product removed from cart" };
            }
            const updatedProduct = this.db.cart.create(product);
            return updatedProduct;
        }
        catch (error) {
            return { error: error.message };
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