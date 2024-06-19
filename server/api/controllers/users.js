import controlller from "./controller.js";
import UserService from "../../services/users.js";
import { authenticateUser, getToken } from "../../services/authentication.js";

class UsersCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res, next) {
        try {
            console.log("get user at userCtrl")
            const query = req.query;
            const users = await this.model.users.findAll({ where: query });
            return res.status(200).json(users);
        } catch (error) {
            next(error);    
        }
    }

    async post(req, res, next) {
        try {
            console.log("post user at userCtrl")
            const user = await UserService.createUser(req.body);
            const token = getToken(user);
            res.setHeader("Authorization", token);
            console.log(`user created: ${user} token: ${token}`)
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async put(req, res, next) {
        try {
            console.log("put user at userCtrl")
            const user = await this.model.users.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            console.log("delete user at userCtrl")
            await this.model.users.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            console.log("login user at userCtrl")
            let { username, passwordHash } = req.query;
            const {userSecurity, fullUser} = await authenticateUser({ username:username, pswd:passwordHash });
            const token = getToken(userSecurity);
            //add the token to the header
            res.setHeader("Authorization", token);
            console.log(`user logedin: ${fullUser.username}`)
            return res.status(200).json(fullUser);
        } catch (error) {
            next(error);
        }
    }
}

export default UsersCtrl = new UsersCtrl();