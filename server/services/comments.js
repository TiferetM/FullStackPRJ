import access from '../repositories/access.js';
class CommentAccess extends access
{
    constructor() {
        this.access = accessComments;
    }
    async create(comment) {
        return this.access.create(comment);
    }
    async read(id) {
        return this.access.read(id);
    }
    async update(comment) {
        return this.access.update(comment);
    }
    async delete(id) {
        return this.access.delete(id);
    }
}
export default comments = new comments();
