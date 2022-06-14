import {Router} from "express";
const router = Router();
import * as generatorService from '../../../domain/rest/generators/generators.service';

router.post('/get', generatorService.get);

export default router;
