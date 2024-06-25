import access from '../repositories/access.js'
import accessArticle from "../repositories/articles.js"

class ArticleService {
    async create(article) {
        console.log("create article at articleService")
        return accessArticle.create(article);
    }

    async read(id) {
        console.log("read article at articleService")
        return accessArticle.read(id);
    }

    async readAll(query = {}) {
        console.log("read all articles at articleService")
        return accessArticle.readAll(query);
    }

    async update(article) {
        console.log("update article at articleService")
        return accessArticle.update(article);
    }

    async delete(id) {
        console.log("delete article at articleService")
        return accessArticle.delete(id);
    }
}

export default ArticleService = new ArticleService();