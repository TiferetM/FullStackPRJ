import access from "./access";

class CommentAccess extends access {
    constructor() {
        super();
    }   

    async create(comment) {
        try {
            const newComment = this.db.comments.create({
                body: comment.body,
                articleId: comment.articleId,
                userId: comment.userId
            });
            return newComment;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async read(id) {
        try {
            const comment = this.db.comments.findOne({ where: { id: id } });
            return comment;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    
    update(comment) {
        try {
            const updatedComment = this.db.comments.update(comment, {
                where: { id: comment.id }
            });
            return updatedComment;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async delete(id) {
        try {
            await this.db.comments.destroy({
                where: { id: id }
            });
            return { message: "comment deleted" };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
export default userAccess = new CommentAccess();