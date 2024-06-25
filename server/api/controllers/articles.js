import controlller from "./controller.js";

class ArticlesCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get articles at ArticlesCtrl")
            const query = req.query;
            const articles = await this.model.articles.findAll({ where: query });
            return res.status(200).json(articles);
        } catch (error) {
            next(error, req, res);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post articles at ArticlesCtrl")
            const article = await this.model.articles.create(req.body);
            return res.status(201).json(article);
        } catch (error) {
            next(error, req, res);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put articles at ArticlesCtrl")
            const article = await this.model.articles.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(article);
        } catch (error) {
            next(error, req, res);
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete article at ArticleCtrl")
            await this.model.articles.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error, req, res);
        }
    }
}

export default ArticlesCtrl = new ArticlesCtrl()