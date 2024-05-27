import usersCont from '../controllers/users';
import router from './router';
router.post('/signup', usersCont.post);
router.post('/:id_u/designs', designCont.post);
router.post('/:id_u/articles', articlesCont.post);
router.post('/:id_u/products', productsCont.post);
router.post('/:id_u/comments', commentsCont.post);