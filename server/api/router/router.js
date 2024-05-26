import { server } from '../server';
const router = server.router()
router.use(express.json())
export default router;