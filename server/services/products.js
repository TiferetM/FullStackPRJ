import accessUsers from '../repositories/products.js'

class productService {
    constructor(){
    }
    async create(productService){
        return accessProducts.create(products);
    }

    async readProduct(id){
        return accessProducts.read(id);
    }

    async updateProduct(product){
        return accessProducts.update(product);
    }

    async deleteProduct(id){
        return accessProducts.delete(id);
    }
}

export default productService = new productService();