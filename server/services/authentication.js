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
export function getToken(data) {
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
    console.log("authenticate user at authentication " + user.username)
    let userSecurity;
    try{
        userSecurity = await UserAccess.getUserPassword(user.username);
    }
    catch (error) {
        throw new Error(userSecurity);
    }
    if (user.passwordHash == userSecurity.pswd) {
        const fullUser = await UserAccess.getUser(user.username);
        console.log(`user authenticated: ${fullUser.email}`);
        return {fullUser, userSecurity};
    }
}


// const privateKey = "-----BEGIN PRIVATE KEY-----MIIEowIBAAKCAQEA7Q3e7c97O+q6RU2KJd4JcWmVJ+4NZl1QK/qkYZwrayZjJygjLNL+X7KgImFvSRHt0y5UMLGp9d7mP6Jw7OFO/sWf+p/jz0TAenld7Fv8v6piCciJ7D3SPUQc0GT4L/A7U/z+tZ9QXh4C4MJZaXak0t9QJcZtEdPUnxdJ/4D+T+VrGfXRU8bhVVZj5bwK6mOAzY9eDFe8k3fLriNf3Rt5x1/qfgzv1fKkExfS+aI+V7R6FFAL3P8LoSD2W7jW5y7/s91uQ4odE7XhYHHTth42gPb58FttGbqBFWKlJ5dFgOfuK1BOGrrJYRtldhnO/yN8D7XnXBS0ezlEpMRR0FeUowIDAQABAoIBAH7YKxGTvhjX6wVRiE1sEM5Rq5Qoy1Vh0WkU4W+KAVXaqOv9xLTz8/7Sn8D0ix1yq+Z6r3NTVIBJMD+l4Ne2/N5p0+uLsYlPEErZg2wI8JH5oLBJ/u6V2tb/WIoIwsxqB5xvCsHoEDKmk/xJCb8qRF3zK7TO55bQieBcsVm2Nyg5xT0CZ7DBTXRHm5nNzgU0C0GVJpmDL8uL6Cq3G0IpYF8Mb/gQ7a0N8EWezxu3mC1aF16n3C7GDtiM+dWhg5zgq+lAMOx58nM2Qab0sLtBU8zVRpkU7HSDvhjBZQGMrqrGl20AQZUz/oGt5t/yX0UI+qSUTXzUlZrLgeKu0SNLZUkCgYEA+Y5QX6F0WqsQqZzxnmkHQq6TkZhHpzZhrdAp59xaMSs7WhXmPyHeZqHbMDIM8QF7OSr2/Nh6oJbmj8D/X7+VkXEC/JL6OpzTGG5qGk1U04ElDiGaUBAocbRx/jM1R3m1p1jSmUPH9IKqjeIuRtTTrs7fn9AuvjpfOWYUGtG4iaUCgYEA9T3Ve61bJ6dVo3WHTe7zERmC7HByXcTDpyYZv/QbR1B+gtYmT3yO8EFu1Dt0RkkL0HpMU+jP1YOVhAlf+DOA+LQhG79Ep7RBwB5+6xkG2qR7TqTD2mlAEZJsnzqXbXpmqS47XzG2J1m3+4XkF4PQSuUQwUTG4yhm0n90D7w3xfMCgYEAmxYBoYAWP7gU43ZlC6LOHgY+efqFCUKN0xuxFE/h/RM9gX2ICcchC6E1txGIVirXvCpB0M8EnkDoC8v1XeGUdCL9MgEOA9t5m7jP1P4S2D9uKrXTWPlbrhke3ehMT7nC6QeRcdZrkAB/Ow4y0BaTWUR1od+sxg1knRG7JfOnPxUCgYBsc+m91boBrLdb1OSg6aOxDHRKJzS5b5DUDT55anMihEUHb78zBvP7hZKKgd9NkFg5aTSH/VyMuZMMMPkbFcCEwEG3+5Zt9S0/HEU3R7b/EmRRGORvho3c0KtWULeU20NGhV+aX9AAOio5eo5DwH3ZcHcdqLpuXY3/kQckr5gNsQKBgQCKq0DZGOBFrD5PNqdxvX4D83JeP/T+Y2u41TbZuhMbkDzSRR1o6TkviPdcLgP11rwKy0XXs/lMhJ0MHymFKY2+2X0K9ZQ1SMVoYYwY3KDgBLMG/rnMnt+n0Bx/f34gXfl1iOfcLcz/4/Xu3F4H4Ah/jrFFBa0e35YN8A6+uoW0Xw==-----END PRIVATE KEY-----";
// const publicKey = "-----BEGIN PUBLIC KEY-----MIIBCgKCAQEA7Q3e7c97O+q6RU2KJd4JcWmVJ+4NZl1QK/qkYZwrayZjJygjLNL+X7KgImFvSRHt0y5UMLGp9d7mP6Jw7OFO/sWf+p/jz0TAenld7Fv8v6piCciJ7D3SPUQc0GT4L/A7U/z+tZ9QXh4C4MJZaXak0t9QJcZtEdPUnxdJ/4D+T+VrGfXRU8bhVVZj5bwK6mOAzY9eDFe8k3fLriNf3Rt5x1/qfgzv1fKkExfS+aI+V7R6FFAL3P8LoSD2W7jW5y7/s91uQ4odE7XhYHHTth42gPb58FttGbqBFWKlJ5dFgOfuK1BOGrrJYRtldhnO/yN8D7XnXBS0ezlEpMRR0FeUowIDAQAB-----END PUBLIC KEY-----";

// export function decryptData(encryptedData) {
//     const buffer = Buffer.from(encryptedData, 'base64');
//     const decrypted = crypto.privateDecrypt(
//         {
//             key: privateKey,
//             passphrase: 'your-secure-passphrase',
//         },
//         buffer
//     );
//     return decrypted.toString('utf-8');
// }

// export function getToken(user) {
//     console.log("get token at authentication")
//     const data = Buffer.from(JSON.stringify(user)).toString('base64');
//     const token = crypto.publicEncrypt(
//         {
//             key: publicKey,
//             passphrase: 'your-secure-passphrase',
//         },
//         Buffer.from(data)
//     ).toString('base64');
//     return token;
// }