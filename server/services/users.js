import accessUsers from '../repositories/users.js'

class userService {
    constructor(){
    }

    async createUser(user){
        return accessUsers.create(user);
    }

    async readUser(id){
        return accessUsers.read(id);
    }

    async updateUser(user){
        return accessUsers.update(user);
    }

    async deleteUser(id){
        return accessUsers.delete(id);
    }
}

export default userService = new userService();