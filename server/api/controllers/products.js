import controlller from "./controller.js";
import ProductService from "../../services/products.js";
import { dirname, join } from "path";

class ProductsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get at productsCtrl")
            const query = req.query;
            const products = query ?
                await ProductService.readProducts(query) :
                req.params.id_p ?
                    await ProductService.readProduct(req.params.id_p) :
                    await ProductService.readProducts();
            console.log(products);
            //returns products in json format
            return res.status(200).json(products);
        } catch (error) {
            next(error, req, res);
        }
    }

    async getCart(req, res, next) {
        try {
            console.log("get cart at productCtrl")
            const id_u = req.params.id_u;
            const products = await ProductService.readCart(id_u);
            return res.status(200).json(products);
        } catch (error) {
            next(error, req, res);
        }
    }

    async getImg(req, res, next) {
        try {
            console.log("get img at productCtrl")
            const id_p = req.params.id_p;
            const product = await ProductService.readProduct(id_p);
            const __dirname = dirname(fileURLToPath(import.meta.url));
            return res.status(200).sendFile(join(__dirname, `../../repositories/products/${product.pic}`));
        } catch (error) {
            next(error, req, res);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post product at productCtrl");
            console.log(req.body);
            const product = await ProductService.create(req.body);
            return res.status(201).json(product);
        } catch (error) {
            next(error, req, res);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put product at productCtrl")
            const body = req.body? req.body : {pic : req.file.filename};
            const product = await ProductService.updateProduct(req.params.id_p, body);
            return res.status(200).json(product);
        } catch (error) {
            next(error, req, res);
        }
    }

    async putCart(req, res, next) {
        let product;
        try {
            console.log("put cart at productCtrl", req.body, req.params.id_u, req.headers.add)
            product = await ProductService.updateCart(req.body, req.params.id_u, req.headers.add);
            return res.status(200).json(product);
        } catch (error) {
            next(error, req, res);
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete product at productCtrl")
            await this.model.products.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error, req, res);
        }
    }
}
export default ProductsCtrl = new ProductsCtrl()