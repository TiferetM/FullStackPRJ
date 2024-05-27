import controlller from "./controlller";

class articlesCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const query = req.query;
            const articles = await this.model.articles.findAll({ where: query });
            return res.status(200).json(articles);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async post(req, res) {
        try {
            const article = await this.model.articles.create(req.body);
            return res.status(201).json(article);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async put(req, res) {
        try {
            const article = await this.model.articles.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(article);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await this.model.articles.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}