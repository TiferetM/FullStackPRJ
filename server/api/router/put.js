import usersCtrl from '../controllers/users';
import router from './router';

router.put('/:id_u', usersCtrl.put);
router.put('/:id_u/designs/:id_d', designCtrl.put);
router.put('/:id_u/articles/:id_a', articlesCtrl.put);
router.put('/:id_u/products/:id_p', productsCtrl.put);
router.put('/:id_u/comments/:id_c', commentsCtrl.put);
router.put('/:id_u/cart', productsCtrl.putCart)

