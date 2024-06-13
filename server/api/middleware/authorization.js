import UserService from '../services/users.js';
const authorize = (requiredRoles) => (req, res, next) => {
    // Get the user's roles
    const userRoles = UserService.readRole(req.user.username); 
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    // Check if the user has the required role
    if (!hasRequiredRole) {
        return res.status(403).send({ error: 'Access denied' });
    }

    next();
};
export default authorize;	