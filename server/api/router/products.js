import ProductsCtrl from "../controllers/products.js";
import express from "express";
import uploadPhoto from "../middleware/photoLoader.js";

const productRouter = express.Router();

productRouter.get("/:id_u/products", ProductsCtrl.get);
productRouter.get("/:id_u/products/:id_p/img", ProductsCtrl.getImg);
productRouter.get("/:id_u/products/:id_p", ProductsCtrl.get);
productRouter.get("/:id_u/products/?q", ProductsCtrl.get);
productRouter.get("/:id_u/cart", ProductsCtrl.getCart);

productRouter.post('/:id_u/products', ProductsCtrl.post);

productRouter.put('/:id_u/products/:id_p', uploadPhoto.single("file"), ProductsCtrl.put);
productRouter.put('/:id_u/cart/:id_p', ProductsCtrl.putCart);
productRouter.put("/:id_u/cart", ProductsCtrl.putCart);

productRouter.delete('/:id_u/products/:id_p', ProductsCtrl.delete);

export default productRouter;
