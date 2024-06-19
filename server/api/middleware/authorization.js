import UserService from '../../services/users.js';
const authorize = () => (req, res, next) => {; 
    // Check if the user has the required role
    if (!UserService.checkRole(req.path, req.method, req.user.role)) {
        return res.status(403).send({ error: 'Access denied' });
    }
    next();
};
export default authorize;	