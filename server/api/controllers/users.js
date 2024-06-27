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
            const username = req.params.id_u;
            const users = await UserService.readUser(username);
            return res.status(200).json(users);
        } catch (error) {
            next(error, req, res);    
        }
    }

    async post(req, res, next) {
        try {
            console.log("post user at userCtrl")
            const user = await UserService.createUser(req.body);
            const token = await getToken(user.username);
            res.setHeader("Authorization", token);
            console.log(`user created: ${user} token: ${token}`)
            return res.status(201).json(user);
        } catch (error) {
            if(error.message == "Username already exist")
                res.status = 409;
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
            const {fullUser} = await authenticateUser({ username:username, pswd:passwordHash });
            const token = await getToken(fullUser.username);
            //add the token to the header
            res.setHeader("Role", fullUser.role);
            res.setHeader("Authorization", token);
            console.log(`user logedin: `, fullUser.role)
            return res.status(200).json(fullUser);
        } catch (error) {
            next(error, req, res);
        }
    }
}

export default UsersCtrl = new UsersCtrl();