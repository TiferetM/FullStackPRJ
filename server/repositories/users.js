import Access from "./access.js";

class UserAccess extends Access {
    constructor() {
        super();
        this.collection = this.db.users;
        //access to the user model
    }
    async getUserPassword(username) {
        try {
            const user = this.db.collection('users').findOne({ where: { username: username } });
            console.log(user.username);
            return { pswd: user.passwordHash, salt: user.salt };
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async getUserID(username) {
        try {
            const user = this.collection('users').findOne({ where: { username: username } });
            return user.id;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async create(user) {
        try {
            this.db.collection('users').insertOne
            //add the user to the database without the salt and password hash
            const newUser = await this.db.collection('users').insertOne({
                username: user.username,
                email: user.email,
                profilePic: user.profilePic??'',
                staredArticles: [],
                staredDesigns: [],
                staredProducts: [],
                cart: [],
                saved: []
            });
            console.log(`user created: ${newUser.username}`);
            await this.db.collection('PasswordHash').insertOne({
                username: user.username,
                salt: Math.ceil(Math.random() * 1000),
                passwordHash: user.passwordHash
            });
            console.log(`user created: ${newUser.username} and pswd`);
            return newUser;
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }

    }
    async getUser(username) {
        try {
            const user = this.db.collection('users').findOne({ where: { username: username } });
            return user;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readRole(username) {
        try {
            //get the role from role collection where username is the same
            const role = this.db.collection('roles').findOne({ where: { username: username } });
            return role;
        }
        catch (error) {
            return { error: error.message };
        }
    }
}

export default UserAccess = new UserAccess();