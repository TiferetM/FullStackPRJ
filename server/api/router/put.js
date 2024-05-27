import usersCont from '../controllers/users';
import router from './router';

router.put('/:id_u', usersCont.put);
router.put('/:id_u/designs/:id_d', designCont.put);
router.put('/:id_u/articles/:id_a', articlesCont.put);
router.put('/:id_u/products/:id_p', productsCont.put);
router.put('/:id_u/comments/:id_c', commentsCont.put);

