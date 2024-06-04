import CommentsCtrl from "../controllers/comments.js";

const commentRouter = require("express").Router();
commentRouter.delete('/:id_u/comments/:id_c', CommentsCtrl.delete);
commentRouter.post('/:id_u/comments', CommentsCtrl.post);
commentRouter.put('/:id_u/comments/:id_c', CommentsCtrl.put);
commentRouter.get("/:id_u/comments", CommentsCtrl.get);

export default commentRouter;