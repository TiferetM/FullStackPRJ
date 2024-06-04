import controlller from "./controller";
import ProductService from "../../services/products";
class ProductsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            console.log("get at productsCtrl")
            const query = req.query;
            const products = query?await ProductService.readProducts(query):await productServices.readProduct();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getCart(req, res) {
        try {
            const id_u = req.params.id_u;
            const products = await ProductService.readCart(id_u);
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async post(req, res) {
        try {
            const product = await this.model.products.create(req.body);
            return res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async put(req, res) {
        try {
            const product = await this.model.products.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async putCart(req, res) {
        try {
            if (req.headers.add === "false") {
                const product = await ProductService.updateCart(req.body, req.params.id_u, false);
            }
            else { 
                const product = await ProductService.updateCart(req.body, req.params.id_u); 
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await this.model.products.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
export default ProductsCtrl = new ProductsCtrl()