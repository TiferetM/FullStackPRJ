import Access from "./access.js";

class UserAccess extends Access {
    constructor() {
        super();
        this.collection = this.db.users;
        //access to the user model
    }
    async getUserPassword(username) {
        try {
            const user = await this.db.collection('PasswordHash').findOne({ username: username });
            console.log(user);
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
            console.log(`user created: ${newUser.insertedId}`);
            const pswd = await this.db.collection('PasswordHash').insertOne({
                username: user.username,
                salt: Math.ceil(Math.random() * 1000),
                passwordHash: user.passwordHash
            });
            console.log(`user created: ${newUser.insertedId} and pswd ${pswd.insertedId}`);
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
            console.log(`getUser: ${user.toString()} at userAccess`);
            return user;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readRole(path) {
        try {
            //get the role from role collection where username is the same
            const role = this.db.collection('roles').findOne({ path: path });
            return role;
        }
        catch (error) {
            return { error: error.message };
        }
    }
}

export default UserAccess = new UserAccess();