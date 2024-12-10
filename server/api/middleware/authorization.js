import UserService from '../../services/users.js';
const authorize = async (req, res, next) => {
    console.log(`in authorization middlware`);
    // Check if the user has the required role
    if (!(await UserService.checkRole(req.path, req.method, req.user.role))) {
        console.log(`authorize path: ${req.path} method: ${req.method} role: ${req.user.role} denied`);
        res.status(403);
        throw new Error('Access denied');
    }
    next();
};
export default authorize;	