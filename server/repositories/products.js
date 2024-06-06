
import Access from "./access.js";

class ProductAccess extends Access {
    constructor() {
        super();
    }
    async read(id) {
        try {
            const product = this.db.db.products.findOne({ where: { id: id } });
            return product;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readAll(query = {}) {
        try {
            let products = this.db.db.collection("products").find()
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
            const cart = db.cart.aggregate([
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
            const newProduct = this.db.products.create({
                name: product.tilte,
                price: product.price,
                category: product.category,
            pic: product.image,
                quantity: product.quantity
            });
            return newProduct;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    update(product) {
        try {
            const updatedProduct = this.db.products.update(product, {
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
                await this.db.cart.destroy({
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
            await this.db.products.destroy({
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