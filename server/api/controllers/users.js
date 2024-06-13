import controlller from "./controller.js";
import UserService from "../../services/users.js";
import { publicKey } from "../../services/authentication.js";

class UsersCtrl extends controlller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            console.log("get user at userCtrl")
            const query = req.query;
            const users = await this.model.users.findAll({ where: query });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async post(req, res) {
        try {
            console.log("post user at userCtrl")
            const user = await UserService.createUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async put(req, res) {
        try {
            console.log("put user at userCtrl")
            const user = await this.model.users.update(req.body, {
                where: { id: req.params.id },
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            console.log("delete user at userCtrl")
            await this.model.users.destroy({
                where: { id: req.params.id },
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            UserService.readUser(req.body);
            res.header("Authorization", "public key " + publicKey);
            return res.status(200).json(req.user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default UsersCtrl = new UsersCtrl();