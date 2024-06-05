import access from '../repositories/access.js'

class ArticleService {
    async create(article) {
        console.log("create article at articleService")
        return accessArticle.create(article);
    }

    async read(id) {
        console.log("read article at articleService")
        return accessArticle.read(id);
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