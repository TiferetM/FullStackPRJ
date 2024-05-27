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
            //add the user to the database without the salt and password hash
            const newUser = this.db.users.create({
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                staredArticles: [],
                staredDesigns: [],
                staredProducts: [],
                cart: [],
                saved: []
            });
            this.db.PasswordHashs.create({
                username: user.username,
                salt: Math.ceil(Math.random() * 1000),
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