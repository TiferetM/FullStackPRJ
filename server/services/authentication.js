import fs from 'fs';
import crypto from 'crypto';
import UserAccess from "../repositories/users.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Buffer } from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load the keys
const keyPath = path.join(__dirname, '..', 'repositories');
const privateKey = fs.readFileSync(`${keyPath}/private_key.pem`, 'utf8');
const publicKey = fs.readFileSync(`${keyPath}/public_key.pem`, 'utf8');

// Function to create a token
export async function getToken(username) {
    const data = await UserAccess.getUserPassword(username);
    const buffer = Buffer.from(JSON.stringify(data));
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

// Function to decrypt the token
export async function decryptData(token) {
    const buffer = Buffer.from(token, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return await JSON.parse(decrypted.toString('utf8'));
}

export const authenticateUser = async (user) => {
    let userSecurity;
    try{
        userSecurity = await UserAccess.getUserPassword(user.username);
    }
    catch (error) {
        throw new Error(error);
    }
    if (user.pswd == userSecurity.pswd) {
        const fullUser = await UserAccess.getUser(user.username);
        console.log(`user authenticated: ${fullUser}`);
        return fullUser;
    }
    else{
        throw new Error("Invalid password");
    }
}