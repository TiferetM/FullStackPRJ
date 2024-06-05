import controlller from "./controller.js";

class DesignsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            console.log("get design at designCtrl")
            const query = req.query;
            const designs = await this.model.designs.findAll({ where: query });
            return res.status(200).json(designs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async post(req, res) {
        try {
            console.log("post design at designCtrl")
            const design = await this.model.designs.create(req.body);
            return res.status(201).json(design);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async put(req, res) {
        try {
            console.log("put design at designCtrl")
            const design = await this.model.designs.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(design);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            console.log("delete design at designCtrl")
            await this.model.designs.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default DesignsCtrl = new DesignsCtrl