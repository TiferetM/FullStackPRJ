import UsersCtrl from '../controllers/users.js';
import express from 'express';

const userRouter = express.Router();
userRouter.delete('/:id_u', UsersCtrl.delete);
userRouter.get('/login', UsersCtrl.login);
userRouter.get('/:id_u/avatar/:id_f', UsersCtrl.getAvatar);
userRouter.get('/:id_u', UsersCtrl.get);
userRouter.post('/signup', UsersCtrl.post);
userRouter.post('/:id_u/fallow', UsersCtrl.postFallow);
userRouter.put('/:id_u', UsersCtrl.put);
userRouter.put('/:id_u/confirm', UsersCtrl.putEmail);

export default userRouter;