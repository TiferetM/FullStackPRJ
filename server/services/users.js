import accessUsers from '../repositories/users.js'
import accessArticles from '../repositories/articles.js'
import accessDesigns from '../repositories/designs.js'
import accessComments from '../repositories/comment.js'

class UserService {
    constructor() {
    }

    async createUser(user) {
        console.log("createUser at userService")
        if(!accessUsers.getUser(user.username))
           throw new Error("Username already exist");
        return accessUsers.create(user);
    }

    async readUser(id) {
        return accessUsers.getUser(id);
    }

    async createFallower(username, friend) {
        const fallowes = accessUsers.createFallower(username, friend);
        if (accessUsers.readFallowes(friend).then(fallowes => fallowes.some(fallowe => fallowe.username === username))) {
            return fallowes;
        }
    }

    async checkRole(path, method, role) {
        const pathArray = path.split('/');
        const entity = pathArray[2] ?? "users";
        const segments = path.split('/')
        segments[1] = ':id_u';
        if(segments.length == 4) segments[3] = ':id_' + entity[0];
        const noIDPath = segments.join('/');
        const roles = await accessUsers.readRole(noIDPath, method);
        console.log(`roles: ${roles}, noIDPath:${noIDPath} at checkRole`);

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