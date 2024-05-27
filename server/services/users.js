import accessUsers from '../repositories/users.js'

class userSevice {
    constructor(){
    }

    async createUser(user){
        return accessUsers.create(user);
    }
}

export default userSevice = new userSevice();