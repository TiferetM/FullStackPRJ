import CommentAccess from '../repositories/comments.js';

class CommentService
{
    constructor() {
    }
    async create(comment) {
        console.log("create comment at commentService")
        return CommentAccess.create(comment);
    }
    async read(id) {
        console.log("read comment at commentService")
        return CommentAccess.read(id);
    }
    async readAll(query = {}) {
        console.log("read all comments at commentService")
        return CommentAccess.readAll(query);
    }
    async update(comment, id) {
        console.log("update comment at commentService")
        return CommentAccess.update(comment, id);
    }
    async delete(id) {
        console.log("delete comment at commentService")
        return CommentAccess.delete(id);
    }
}
export default CommentService = new CommentService();
