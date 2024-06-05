import access from "./access.js";

class ArticleAccess extends access {
    constructor() {
        super();
    }   

    async create(article) {
        try {
            const newArticle = this.db.articles.create({
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
            const article = this.db.articles.findOne({ where: { id: id } });
            return article;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    
    update(article) {
        try {
            const updatedArticle = this.db.articles.update(article, {
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
            await this.db.articles.destroy({
                where: { id: id }
            });
            return { message: "article deleted" };
        }
        catch (error) {
            return { error: error.message };
        }
    }

}