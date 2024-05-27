import usersCont from '../controllers/users';
import router from './router';

router.delete('/:id_u', usersCont.delete);
router.delete('/:id_u/designs/:id_d', designCont.delete);
router.delete('/:id_u/articles/:id_a', articlesCont.delete);
router.delete('/:id_u/products/:id_p', productsCont.delete);
router.delete('/:id_u/comments/:id_c', commentsCont.delete);
