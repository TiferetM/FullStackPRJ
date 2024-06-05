import accessProducts from '../repositories/products.js'

class ProductService {
    constructor(){
    }
    async create(product){
        console.log("create product at productService")
        return accessProducts.create(product);
    }

    async readProduct(id){
        return accessProducts.read(id);
    }

    async readProducts(query = null){
        return accessProducts.read(query?query:null);
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

export default ProductService = new ProductService();