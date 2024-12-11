import accessUsers from '../repositories/users.js';
import accessArticles from '../repositories/articles.js';
import accessDesigns from '../repositories/designs.js';
import accessComments from '../repositories/comments.js';
import sendEmail from '../services/email.sending.js';
import { getToken } from './authentication.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { get } from 'http';

class UserService {
    constructor() { }

    async createUser(user) {
        console.log("createUser at userService");
        if (!accessUsers.getUser(user.username))
            throw new Error("Username already exists");
        const newUser = await accessUsers.create(user);
        const token = await getToken(user.username);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const templatePath = path.join(__dirname, '../repositories/html for emails/signUpConferm.html');
        const variables = {
            name: user.username,
            url: `http://localhost:3305/${user.username}/confirm`,
            email: user.email,
            token: token // Add token to variables if needed
        };

        await sendEmail(user.email, 'Confirm Your Email', templatePath, variables);
        return { user: newUser, token: token };
    }

    async readUser(id, userIn) {
        const user = await accessUsers.getUser(id);
        if(!userIn) return user;
        if (id !== userIn) {
            //check if userIn is fallowing id
            const isFallowing = await accessUsers.readFallowes(userIn)
                .then(fallowers => fallowers.some(fallow => fallow.username === id));
            //check if id is fallowing userIn
            const isFallowingBack = await accessUsers.readFallowes(id)
                .then(fallowers => fallowers.some(fallow => fallow.username === userIn));
            if (!isFallowing && !isFallowingBack)
                user.relationship = "none";
            else if (isFallowing && !isFallowingBack)
                //userIn is fallowing id but id is not fallowing userIn
                user.relationship = "following";
            else if (!isFallowing && isFallowingBack)
                //id is fallowing userIn but userIn is not fallowing id
                user.relationship = "followed";
            else
                user.relationship = "friends";
        } else
            user.relationship = "self";
        return user;
    }

    async readAvatar(id) {
        return await accessUsers.getUser(id).profilePic;
    }

    async createFollower(username, friend) {
        const following = accessUsers.readFallowes(username);//get the users that username is fallowing
        const isFollowingAlready = await accessUsers.readFallowes(username)
            //check if username is fallowing friend already
            .then(following => following.some(follow => follow.username === friend));
        if (isFollowingAlready)
            throw new Error("Already following this user");

        const followers = accessUsers.createFallower(username, friend);
        const isFollowerAlready = await accessUsers.readFallowes(friend)
            .then(followers => followers.some(follower => follower.username === username));

        if (!isFollowerAlready) {
            await sendFallowingEmail(username, friend);
        }
        return followers;
    }

    async __sendFallowingEmail(username, friend) {
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

    async checkRole(path, method, role) {
        const pathArray = path.split('/');
        const user = pathArray[1];
        const entity = pathArray[2] ?? "users";
        const segments = path.split('/');
        segments[1] = ':id_u';
        if (segments.length == 4) segments[3] = ':id_' + entity[0];
        const noIDPath = segments.join('/');
        const roles = (await accessUsers.readRole(noIDPath, method)).map(role => role.role);
        console.log(`roles: ${roles}, noIDPath: ${noIDPath} at checkRole`);

        if (roles.some(role => role === 'owner')) {
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
            return roles.some(role => role === 'admin' || role === 'registered' || role === 'everyone');
        } else if (role === 'user') {
            return roles.some(role => role === 'registered' || role === 'everyone');
        } else if (role === 'guest') {
            return roles.some(role => role === 'everyone');
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
