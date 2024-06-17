import UsersCtrl from '../controllers/users.js';
import express from 'express';

const userRouter = express.Router();
userRouter.delete('/:id_u', UsersCtrl.delete);
userRouter.get('/login', UsersCtrl.login);
userRouter.get('/:id_u', UsersCtrl.get);
userRouter.post('/signup', UsersCtrl.post);
userRouter.put('/:id_u', UsersCtrl.put);

export default userRouter;