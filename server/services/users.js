import accessUsers from '../repositories/users.js';
import accessArticles from '../repositories/articles.js';
import accessDesigns from '../repositories/designs.js';
import accessComments from '../repositories/comment.js';
import sendEmail from '../services/email.sending.js';
import path from 'path';

class UserService {
    constructor() {}

    async createUser(user) {
        console.log("createUser at userService");
        if (!accessUsers.getUser(user.username))
            throw new Error("Username already exists");
        const newUser = accessUsers.create(user);

        const templatePath = path.join(__dirname, '../views/signUpConfermation.ejs');
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
        return accessUsers.getUser(id);
    }

    async createFollower(username, friend) {
        const followers = accessUsers.createFollower(username, friend);
        const isFollowerAlready = await accessUsers.readFollowers(friend)
            .then(followers => followers.some(follower => follower.username === username));

        if (!isFollowerAlready) {
            const followFriend = accessUsers.getUser(friend);
            const templatePath = path.join(__dirname, '../views/followMessage.ejs');
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
            return entityObject.author.toString() === accessUsers.readById(userid);
        } else if (role === 'admin') {
            return roles.some(path => path.role === 'admin' || path.role === 'registered' || path.role === 'everyone');
        } else if (role === 'registered') {
            return roles.some(path => path.role === 'registered' || path.role === 'everyone');
        } else if (role === 'guest') {
            return roles.some(path => path.role === 'everyone');
        }
        return false;
    }

    async updateUser(user) {
        return accessUsers.update(user);
    }

    async deleteUser(id) {
        return accessUsers.delete(id);
    }
}

export default UserService = new UserService();
