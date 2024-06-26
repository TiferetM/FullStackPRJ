import controlller from "./controller.js";
import DesignsService from "../../services/designs.js"

class DesignsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get design at designCtrl")
            const query = req.query;
            const designs = await DesignsService.findAll({ where: query });
            return res.status(200).json(designs);
        } catch (error) {
            next(error, req, res);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post design at designCtrl")
            const design = await DesignsService.create(req.body);
            return res.status(201).json(design);
        } catch (error) {
            next(error, req, res);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put design at designCtrl")
            const design = await DesignsService.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(design);
        } catch (error) {
            next(error, req, res);
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete design at designCtrl")
            await DesignsService.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error, req, res);
        }
    }
}

export default DesignsCtrl = new DesignsCtrl