import {Router} from "express";
const router = Router();
import {index} from '../../../domain/rest/index/index.service';

/* GET home page. */
router.get('/', index);

export default router;
