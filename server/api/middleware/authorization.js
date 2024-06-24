import UserService from '../../services/users.js';
const authorize = (req, res, next) => {
    // Check if the user has the required role
    console.log(`authorize path: ${req.path} method: ${req.method} role: ${req.user.role}at authorization`);	
    if (!UserService.checkRole(req.path, req.method, req.user.role)) {
        res.status(403);
        throw new Error('Access denied');
    }
    next();
};
export default authorize;	