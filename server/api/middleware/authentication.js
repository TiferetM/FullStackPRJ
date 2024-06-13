import {decryptData, authenticateUser} from '../../services/authentication.js';
const authenticate = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization').replace('Bearer ', '');
    // Check if token exists
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    // Decrypt the token and authenticate the user
    try {
        const decoded = decryptData(token);
        const userData = JSON.parse(decoded);
        const user = authenticateUser(userData);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};
export default authenticate;