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
            let newUser = await this.db.collection('users').insertOne({
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
            if(newUser) newUser = await this.getUser(user.username)
            const pswd = await this.db.collection('PasswordHash').insertOne({
                username: user.username,
                salt: Math.ceil(Math.random() * 1000),
                passwordHash: user.passwordHash
            });
            console.log(newUser)
            return newUser;
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }

    }
    async getUser(username) {
        try {
            console.log("getUser at user access username:",username);
            const user = await this.db.collection('users').findOne({ username: username });
            console.log("getUser at user access",user);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
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
            throw new Error(error.message);
        }
    }

    async update(username, updateFields) {
        try {
            const updatedUser = await this.db.collection('users').updateOne(
                { username: username },
                { $set: updateFields }
            );
            if (updatedUser.matchedCount === 0) {
                throw new Error('User not found');
            }
            if (updatedUser.modifiedCount === 0) {
                throw new Error('No changes made to the user');
            }
            return this.getUser(username);
        } catch (error) {
            new Error(error.message);
        }
    }
    
}

export default UserAccess = new UserAccess();