import router from "./router";
import usersCtrl from "../controllers/users";

router.get("/login", usersCtrl.login);
router.get("/:id_u/designs", designsCtrl.get);
router.get("/:id_u/articles", articlesCtrl.get);
router.get("/:id_u/designs/?q", designsCtrl.get);
router.get("/:id_u/articles/?q", articlesCtrl.get);
router.get("/:id_u/products", productsCtrl.get);
router.get("/:id_u/products/?q", productsCtrl.get);
router.get("/:id_u/cart", productsCtrl.getCart);
