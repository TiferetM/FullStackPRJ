
class CommentService
{
    constructor() {
    }
    async create(comment) {
        console.log("create comment at commentService")
        return this.access.create(comment);
    }
    async read(id) {
        console.log("read comment at commentService")
        return this.access.read(id);
    }
    async update(comment) {
        console.log("update comment at commentService")
        return this.access.update(comment);
    }
    async delete(id) {
        console.log("delete comment at commentService")
        return this.access.delete(id);
    }
}
export default CommentService = new CommentService();
