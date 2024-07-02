import access from "./access.js";
import { ObjectId } from 'mongodb';

class ArticleAccess extends access {
    constructor() {
        super();
    }

    async create(article) {
        try {
            console.log("create article at articleAccess")
            const newArticle = await this.db.collection('articles').insertOne({
                title: article.title,
                body: article.body,
                author: article.auther,
                category: article.category,
                pic: article.image
            });
            return newArticle;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async read(id) {
        try {
            console.log("read article at articleAccess")
            const article = await this.db.collection('articles').findOne({ _id: new ObjectId(id) });
            return article;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readAll(query={}) {
        try {
            console.log("read all articles at articleAccess")
            const articles = await this.db.collection('articles').find(query).toArray();
            return articles;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async readById(id) {
        try {
            console.log("read article at articleAccess")
            const articleID = new ObjectId(id);
            const article = await this.db.collection('articles').findOne({ _id: articleID });
            return article;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async update(article) {
        try {
            console.log("update article at articleAccess")
            const updatedArticle = await this.db.collection('articles').update(article, {
                where: { id: article.id }
            });
            return updatedArticle;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async delete(id) {
        try {
            console.log("delete article at articleAccess")
            await this.db.collection('articles').destroy({
                where: { id: id }
            });
            return { message: "article deleted" };
        }
        catch (error) {
            return { error: error.message };
        }
    }

}

export default ArticleAccess = new ArticleAccess();