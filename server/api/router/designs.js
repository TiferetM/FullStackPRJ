import DesignCtrl from "../controllers/designs.js";
import express from "express";

const designRouter = express.Router();
designRouter.post('/:id_u/designs', DesignCtrl.post);
designRouter.delete('/:id_u/designs/:id_d', DesignCtrl.delete);
designRouter.get("/:id_u/designs", DesignCtrl.get);
designRouter.get("/:id_u/designs/?q", DesignCtrl.get);
designRouter.put('/:id_u/designs/:id_d', DesignCtrl.put);

export default designRouter;