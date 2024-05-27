import access from '../repositories/access.js'

class articleService {
    constructor() {
    }
    async create(article) {
        return accessArticle.create(article);
    }

    async read(id) {
        return accessArticle.read(id);
    }

    async update(article) {
        return accessArticle.update(article);
    }

    async delete(id) {
        return accessArticle.delete(id);
    }
}

export default articleService = new articleService();