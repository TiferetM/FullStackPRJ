import access from "./access";

class userAccess extends access {
    constructor() {
        super();
        this.collection = this.db.users;
        //access to the user model
    }
    async getUserPassword(username) {
        try {
            const user = this.db.users.findOne({ where: { username: username } });
            console.log(user.username);
            return { pswd: user.passwordHash, salt: user.salt };
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async getUserID(username) {
        try {
            const user = this.db.users.findOne({ where: { username: username } });
            return user.id;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async create(user) {
        try {
            const newUser = this.db.users.create(user);
            this.db.PasswordHashs.create({
                username: user.username,
                salt: Math.ceil(Math.random()*1000),
                passwordHash: newUser.passwordHash
            });
            return newUser;
        }
        catch (error) {
            return { error: error.message };
        }

    }
}

export default userAccess = new userAccess();