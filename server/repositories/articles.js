import access from "./access.js";

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
            const article = await this.db.collection('articles').findOne({ where: { id: id } });
            return article;
        }
        catch (error) {
            return { error: error.message };
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