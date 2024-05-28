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

    async readCart(id){
        return accessProducts.readCart(id);
    }

    async updateProduct(product){
        return accessProducts.update(product);
    }

    async updateCart(product, usernameId, add=true){
        if(!add){
            return accessProducts.updateCart({username: usernameId, product: product.id}, false);
        }
        return accessProducts.updateCart({username: usernameId, product: product.id});
    }

    async deleteProduct(id){
        return accessProducts.delete(id);
    }
}

export default productService = new productService();