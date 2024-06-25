import access from '../repositories/access.js'
import accessArticle from "../repositories/articles.js"
import accessUsers from "../repositories/users.js"

class ArticleService {
    async create(article) {
        console.log("create article at articleService")
        return accessArticle.create(article);
    }

    async read(id) {
        console.log("read article at articleService")
        return accessArticle.read(id);
    }

    async readFriends(id) {
        console.log("read friends at articleService")
        const friends = await accessUsers.read(id).friends;
        let friendArticles = [];
        for (let friend of friends) {
            let articles = await accessArticle.readAll({ author: friend });
            friendArticles.push(...articles);
        }
        return friendArticles;
    }

    async readStared(id) {
        console.log("read stared at articleService")
        const staredArticles = await accessUsers.read(id).stared;
        let stared = [];
        for (let article of staredArticles) {
            let staredArticle = await accessArticle.read(article);
            stared.push(staredArticle);
        }
        return stared;
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