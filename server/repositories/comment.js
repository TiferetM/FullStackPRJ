import access from "./access.js";

class CommentAccess extends access {
    constructor() {
        super();
    }   

    async create(comment) {
        try {
            console.log("create comment at commentAccess")
            const newComment = await this.db.collection("comments").insertOne({
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
            console.log("read comment at commentAccess")
            const comment = await this.db.collection("comments").findOne({ where: { id: id } });
            return comment;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readById(id) {
        try {
            console.log("read comment at commentAccess")
            const commentID = new ObjectId(id);
            const comment = await this.db.collection("comments").findOne({ _id: commentID });
            return comment;
        }
        catch (error) {
           throw new Error(error.message);
        }
    }
    
    async update(comment) {
        try {
            console.log("update comment at commentAccess")
            const updatedComment = await this.db.collection("comments").update(comment, {
                where: { id: comment.id }
            });
            return updatedComment;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async delete(id) {
        console.log("delete comment at commentAccess")
        try {
            await this.db.collection("comments").destroy({
                where: { id: id }
            });
            return { message: "comment deleted" };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
export default CommentAccess = new CommentAccess();