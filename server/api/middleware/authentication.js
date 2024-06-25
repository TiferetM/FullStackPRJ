import {decryptData, authenticateUser} from '../../services/authentication.js';
const authenticate = async (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization');
    console.log("token at authenticate" + token);
    // Check if token exists
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    // Decrypt the token and authenticate the user
    try {
        const decoded = await decryptData(token);
        console.log("decoded at authenticate",  decoded)
        const {fullUser} = await authenticateUser(decoded);
        req.user = fullUser;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("invalid at aytheticate");
    }
};
export default authenticate;