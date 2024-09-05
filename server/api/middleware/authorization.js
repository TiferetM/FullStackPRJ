import UserService from '../../services/users.js';
const authorize = (req, res, next) => {
    // Check if the user has the required role
    if (!UserService.checkRole(req.path, req.method, req.user.role)) {
        console.log(`authorize path: ${req.path} method: ${req.method} role: ${req.user.role} denied`);
        res.status(403);
        throw new Error('Access denied');
    }
    next();
};
export default authorize;	