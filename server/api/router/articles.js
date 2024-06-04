import ArticlesCtrl from "../controllers/articles.js";

const articleRouter = require("exppress").Router();
articleRouter.delete('/:id_u/articles/:id_a', ArticlesCtrl.delete);
articleRouter.get("/:id_u/articles/?q", ArticlesCtrl.get);
articleRouter.get("/:id_u/articles", ArticlesCtrl.get);
articleRouter.post('/:id_u/articles', ArticlesCtrl.post);
articleRouter.put('/:id_u/articles/:id_a', ArticlesCtrl.put);

export default articleRouter;
