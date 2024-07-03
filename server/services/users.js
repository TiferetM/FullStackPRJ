import accessUsers from '../repositories/users.js';
import accessArticles from '../repositories/articles.js';
import accessDesigns from '../repositories/designs.js';
import accessComments from '../repositories/comments.js';
import sendEmail from '../services/email.sending.js';
import path from 'path';
import { fileURLToPath } from 'url';

class UserService {
    constructor() { }

    async createUser(user) {
        console.log("createUser at userService");
        if (!accessUsers.getUser(user.username))
            throw new Error("Username already exists");
        const newUser = accessUsers.create(user);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const templatePath = path.join(__dirname, '../repositories/html for emails/signUpConferm.html');
        const variables = {
            name: user.username,
            url: `http://localhost:3305/${user.username}/confirm`,
            email: user.email,
            token: user.token // Add token to variables if needed
        };

        await sendEmail(user.email, 'Confirm Your Email', templatePath, variables);
        return newUser;
    }

    async readUser(id) {
        return await accessUsers.getUser(id);
    }

    async readAvatar(id) {
        return await accessUsers.getUser(id).profilePic;
    }

    async createFollower(username, friend) {
        const followers = accessUsers.createFallower(username, friend);
        const isFollowerAlready = await accessUsers.readFallowes(friend)
            .then(followers => followers.some(follower => follower.username === username));

        if (!isFollowerAlready) {
            const followFriend = accessUsers.getUser(friend);
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const templatePath = path.join(__dirname, '../repositories/html for emails/followMessage.html');
            const variables = {
                name: followFriend.username,
                follower: username,
                url: `http://localhost:5173/${username}/info`,
                email: followFriend.email,
                token: followFriend.token // Add token to variables if needed
            };

            await sendEmail(followFriend.email, 'You have a new follower', templatePath, variables);
        }

        return followers;
    }

    async checkRole(path, method, role) {
        const pathArray = path.split('/');
        const user = pathArray[1];
        const entity = pathArray[2] ?? "users";
        const segments = path.split('/');
        segments[1] = ':id_u';
        if (segments.length == 4) segments[3] = ':id_' + entity[0];
        const noIDPath = segments.join('/');
        const roles = await accessUsers.readRole(noIDPath, method);
        console.log(`roles: ${roles}, noIDPath: ${noIDPath} at checkRole`);

        if (roles.some(path => path.role === 'owner')) {
            const userid = pathArray[0];
            const id = pathArray[pathArray.length - 1];
            let entityModel;

            switch (entity) {
                case 'users':
                    return true;
                case 'articles':
                    entityModel = accessArticles;
                    break;
                case 'designs':
                    entityModel = accessDesigns;
                    break;
                case 'comments':
                    entityModel = accessComments;
                    break;
                default:
                    throw new Error('Unknown entity type');
            }

            const entityObject = await entityModel.readById(id);
            if (!entityObject) {
                throw new Error('Entity not found');
            }
            if (entity === 'comments')
                return entityObject.userId.toString() === user;
            else
                return entityObject.author.toString() === user;
        } else if (role === 'admin') {
            return roles.some(path => path.role === 'admin' || path.role === 'registered' || path.role === 'everyone');
        } else if (role === 'registered') {
            return roles.some(path => path.role === 'registered' || path.role === 'everyone');
        } else if (role === 'guest') {
            return roles.some(path => path.role === 'everyone');
        }
        return false;
    }

    async update(username, updateFields) {
        return accessUsers.update(username, updateFields);
    }

    async deleteUser(id) {
        return accessUsers.delete(id);
    }
}

export default UserService = new UserService();
