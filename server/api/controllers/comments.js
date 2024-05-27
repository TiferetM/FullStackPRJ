import controlller from "./controlller";

class commentsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const query = req.query;
            const comments = await this.model.comments.findAll({ where: query });
            return res.status(200).json(comments);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async post(req, res) {
        try {
            const comment = await this.model.comments.create(req.body);
            return res.status(201).json(comment);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async put(req, res) {
        try {
            const comment = await this.model.comments.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(comment);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await this.model.comments.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}