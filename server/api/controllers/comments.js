import controlller from "./controller.js";
import CommentsService from "../../services/comments.js"

class CommentsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get comment at commentsCtrl")
            const query = req.query;
            const comments = await CommentsService.readAll(query);
            return res.status(200).json(comments);
        } catch (error) {
            next(error, req, res);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post comment at commentCtrl")
            const comment = await CommentsService.create(req.body);
            return res.status(201).json(comment);
        } catch (error) {
            next(error, req, res);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put comment at commentCtrl")
            const comment = await CommentsService.update(req.body, req.params.id_c);
            return res.status(200).json(comment);
        } catch (error) {
            next(error, req, res);
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete comment at commentCtrl")
            await CommentsService.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error, req, res);
        }
    }
}

export default CommentsCtrl = new CommentsCtrl()