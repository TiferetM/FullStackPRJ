import UsersCtrl from '../controllers/users.js';

const userRouter = require('express').Router();
userRouter.delete('/:id_u', UsersCtrl.delete);
router.get("/login", UsersCtrl.login);
router.post('/signup', UsersCtrl.post);
router.put('/:id_u', UsersCtrl.put);

export default userRouter;