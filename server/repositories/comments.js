import access from "./access.js";
import {ObjectId} from "mongodb";

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
            throw new Error(error.message);
        }
    }
    async read(id) {
        try {
            console.log("read comment at commentAccess")
            const comment = await this.db.collection("comments").findOne({ _id: id });
            return comment;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async readAll(query = {}) {
        try {
            console.log("read all comments at commentAccess")
            const comments = await this.db.collection("comments").find(query).toArray();
            return comments;
        }
        catch (error) {
            throw new Error(error.message);
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
    
    async update(comment, id) {
        try {
            console.log("update comment at commentAccess")
            const updatedComment = await this.db.collection("comments").updateOne({ _id: new ObjectId(id)}, { $set: comment });
            return updatedComment;
        }
        catch (error) {
           throw new Error(error.message);
        }
    }
    async delete(id) {
        console.log("delete comment at commentAccess")
        try {
            await this.db.collection("comments").deleteOne({ _id: new ObjectId(id) });
            return { message: "comment deleted" };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
export default CommentAccess = new CommentAccess();