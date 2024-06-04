import ProductsCtrl from "../controllers/products.js";

const productRouter = require("express").Router();
productRouter.put('/:id_u/products/:id_p', ProductsCtrl.put);
productRouter.post('/:id_u/products', ProductsCtrl.post);
productRouter.put('/:id_u/cart', ProductsCtrl.putCart);
productRouter.delete('/:id_u/products/:id_p', ProductsCtrl.delete);
productRouter.get(":id_u/products", ProductsCtrl.get);
productRouter.get("/:id_u/products/?q", ProductsCtrl.get);
productRouter.get("/:id_u/cart", ProductsCtrl.getCart);

export default productRouter;
