import { sha512 } from "js-sha512";
import { generateKeyPairSync } from "crypto";
import UserAccess from "../repositories/users.js";

export const authenticateUser = (user) => {
    console.log("authenticate user at authentication")
    const userSecurity = UserAccess.getUserPassword(user.username);
    if (userSecurity.error) {
        throw new Error(userSecurity.error);
    }
    else {
        if (user.passwordHash == userSecurity.pswd) {
            return UserAccess.getUser(user.username);
        }
    }
}

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'your-secure-passphrase'
    }
});

export {publicKey};

export function decryptData(encryptedData) {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase: 'your-secure-passphrase',
        },
        buffer
    );
    return decrypted.toString('utf-8');
}