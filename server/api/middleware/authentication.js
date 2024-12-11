import { decryptData, authenticateUser } from '../../services/authentication.js';

const authenticate = async (req, res, next) => {
    console.log(`in authenticate middleware`);
    // Get the token from the header
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    // Decrypt the token and authenticate the user
    try {
        
        const decoded = await decryptData(token);

        const fullUser = await authenticateUser(decoded);
        console.log(` in authticate services, fullUser: ${fullUser}`);
        req.user = fullUser;
        next();
    } catch (error) {
        console.error("Error during authentication:", error.message);
        res.status(401).send({ error: 'Invalid token' });
    }
};

export default authenticate;
