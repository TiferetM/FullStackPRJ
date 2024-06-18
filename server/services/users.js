import accessUsers from '../repositories/users.js'

class UserService {
    constructor() {
    }

    async createUser(user) {
        console.log("createUser at userService")
        return accessUsers.create(user);
    }

    async readUser(id) {
        return accessUsers.read(id);
    }

    async checkRole(path, role) {
        return accessUsers.readRole(path).role == role;
    }

    async updateUser(user) {
        return accessUsers.update(user);
    }

    async deleteUser(id) {
        return accessUsers.delete(id);
    }
}

export default UserService = new UserService();