import Access from "./access.js";

class UserAccess extends Access {
    constructor() {
        super();
        //access to the user model
    }
    async getUserPassword(username) {
        try {
            const user = await this.db.collection('PasswordHash').findOne({ username: username });
            return { username: user.username, pswd: user.passwordHash, salt: user.salt };
        }
        catch (error) {
            console.log(error);
            return { error: error.message };
        }
    }

    async getUserID(username) {
        try {
            const user = this.collection('users').findOne({ username: username });
            return user.id;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async create(user) {
        try {
            //add the user to the database without the salt and password hash
            const newUser = await this.db.collection('users').insertOne({
                //returns the user object
                username: user.username,
                email: user.email,
                profilePic: user.profilePic??'',
                role: "user",
                staredArticles: [],
                staredDesigns: [],
                staredProducts: [],
                cart: [],
                saved: []
            });
            const pswd = await this.db.collection('PasswordHash').insertOne({
                username: user.username,
                salt: Math.ceil(Math.random() * 1000),
                passwordHash: user.passwordHash
            });
            return newUser;
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }

    }
    async getUser(username) {
        try {
            const user = await this.db.collection('users').findOne({ username: username });
            return user;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readRole(path, method) {
        try {
            //get the role from role collection where username is the same
            const roles = await this.db.db.collection('roles').find({ path: path, method: method}).toArray();
            console.log(roles);
            return roles;
        }
        catch (error) {
            return { error: error.message };
        }
    }
}

export default UserAccess = new UserAccess();