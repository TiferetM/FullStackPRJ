import accessProducts from '../repositories/products.js'

class ProductService {
    constructor() {
    }
    async create(product) {
        console.log("create product at productService")
        return accessProducts.create(product);
    }

    async readProduct(id) {
        return accessProducts.read(id);
    }

    async readProducts(query = null) {
        return accessProducts.readAll(query ? query : null);
    }

    async readCart(product, username, add = true) {
        return accessProducts.readCart(product, username, add);
    }

    async updateProduct(product) {
        return accessProducts.update(product);
    }

    async updateCart(product, username, add = true) {
        return accessProducts.updateCart(product, username, add);
    }

    async deleteProduct(id) {
        return accessProducts.delete(id);
    }
}

export default ProductService = new ProductService();