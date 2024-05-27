import access from "./access";

class productAccess extends access {
    constructor() {
        super();
    }
    async read(id) {
        try {
            const product = this.db.products.findOne({ where: { id: id } });
            return product;
        }
        catch (error) {
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
    async delete(id) {
        try {
            await this.db.products.destroy({
                where: { id: id }
            });
            return { message: "product deleted" };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}

 export default userAccess = new productAccess();