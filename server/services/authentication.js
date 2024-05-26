import { sha512 } from "js-sha512";
import { userAccess } from "../repositories/users.js";

export let authenticateUser = (user) => {
    //get the users salt from the database
    const userSecurity = userAccess.getUserPassword(user.username);
    if(userSecurity.error){
        return false;
    }
    if (user.passwordHash == userSecurity.pswd) {
        return true;
    }
    //if the user is not in the database, return false
    return false;
}