import controller from "./controller.js";
import UserService from "../../services/users.js";
import { authenticateUser, getToken } from "../../services/authentication.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

class UsersCtrl extends controller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get user at userCtrl")
            const username = req.params.id_u;
            const user = await UserService.readUser(username);
            return res.status(200).json(user);
        } catch (error) {
            next(error, req, res);    
        }
    }

    async getAvatar(req, res, next) {
        try {
            console.log("getAvatar user at userCtrl")
            const username = req.params.id_f;
            const user = await UserService.readUser(username);   
            const avatar = user.profilePic;
            const __dirname = dirname(fileURLToPath(import.meta.url));        
            return res.status(200).sendFile(join(__dirname, `../../repositories/avatars/${avatar}`));
        } catch (error) {
            next(error, req, res);
        }
    }

    async post(req, res, next) {
        try {
            console.log("post user at userCtrl" , req.body.username)
            const {user, token} = await UserService.createUser(req.body);
            res.setHeader("Authorization", token);
            return res.status(201).json(user);
        } catch (error) {
            if(error.message == "Username already exist")
                res.status = 409;
            next(error, req, res);
        }
    }

    async postFallow(req, res, next) {
        try {
            console.log("postFallow user at userCtrl")
            const { username, friend } = req.body;
            const fallowers = await UserService.createFollower(username, friend);
            return res.status(201).json(fallowers);
        } catch (error) {
            next(error, req, res);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put user at userCtrl")
            const user = await UserService.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(user);
        } catch (error) {
            next(error, req, res);
        }
    }

    async putAvatar(req, res, next) {
        try {
            console.log("putAvatar user at userCtrl")
            const username = req.params.id_u;
            const avatar = req.file.filename;
            const user = await UserService.update(username, {profilePic : avatar});
            return res.status(200).json(user);
        } catch (error) {
            next(error, req, res);
        }
    }

    async putEmail(req, res, next) {
        try {
            console.log("putEmail user at userCtrl")
            return res.status(200).json(user);
        } catch (error) {
            next(error, req, res);
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete user at userCtrl")
            await UserService.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error, req, res);
        }
    }

    async login(req, res, next) {
        try {
            console.log("login user at userCtrl")
            let { username, passwordHash } = req.query;
            const { fullUser } = await authenticateUser({ username: username, pswd: passwordHash });
            const token = await getToken(fullUser.username);
            res.setHeader("Role", fullUser.role);
            res.setHeader("Authorization", token);
            return res.status(200).json(fullUser);
        } catch (error) {
            next(error, req, res);
        }
    }
}

export default new UsersCtrl();
