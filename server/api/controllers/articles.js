import controlller from "./controller.js";
import ArticleService from "../../services/articles.js"

class ArticlesCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            let articles;
            console.log("get articles at ArticlesCtrl")
            const query = req.query;
            //if the query looks like:
            if(query?.friends)
                //if the query looks like: http://localhost:3305/1/articles?friends=true
                articles =  await ArticleService.readFriends(req.params.id_u);
            else if(query?.stared)
                //if the query looks like: http://localhost:3305/1/articles?stared=true
                articles =  await ArticleService.readStared(req.params.id_u);
            else if(query?.author)
                //if the query looks like: http://localhost:3305/1/articles?author=1
                articles =  await ArticleService.readAll(query);
            else if(req.params.id_a)
                articles = await ArticleService.read(req.params.id_a);
            else
                articles = await ArticleService.readAll(query??{});
            return res.status(200).json(articles);
        } catch (error) {
            next(error, req, res);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post articles at ArticlesCtrl")
            const article = await ArticleService.create(req.body);
            return res.status(201).json(article);
        } catch (error) {
            next(error, req, res);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put articles at ArticlesCtrl")
            const article = await ArticleService.update(req.body, {
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
            await ArticleService.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error, req, res);
        }
    }
}

export default ArticlesCtrl = new ArticlesCtrl()