import controlller from "./controller.js";

class DesignsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get design at designCtrl")
            const query = req.query;
            const designs = await this.model.designs.findAll({ where: query });
            return res.status(200).json(designs);
        } catch (error) {
            next(error);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post design at designCtrl")
            const design = await this.model.designs.create(req.body);
            return res.status(201).json(design);
        } catch (error) {
            next(error);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put design at designCtrl")
            const design = await this.model.designs.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(design);
        } catch (error) {
            next(error);    
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete design at designCtrl")
            await this.model.designs.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default DesignsCtrl = new DesignsCtrl