import controlller from "./controller.js";

class CommentsCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get comment at commentsCtrl")
            const query = req.query;
            const comments = await this.model.comments.findAll({ where: query });
            return res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post comment at commentCtrl")
            const comment = await this.model.comments.create(req.body);
            return res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put comment at commentCtrl")
            const comment = await this.model.comments.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(comment);
        } catch (error) {
           next(error);
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete comment at commentCtrl")
            await this.model.comments.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default CommentsCtrl = new CommentsCtrl()