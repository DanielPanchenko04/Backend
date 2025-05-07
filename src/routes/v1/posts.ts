import { Router } from 'express';

import {list, destroy, show, edit, create} from "../../controllers/posts";
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
import { validatorEdit } from 'middleware/validation/posts';

const router = Router();

router.get('/', [checkJwt], list);

router.post('/', [checkJwt], create);

router.get('/:id([0-9]+)', [checkJwt], show);

router.patch('/:id([0-9]+)', [checkJwt, validatorEdit], edit);

router.delete('/:id([0-9]+)', [checkJwt], destroy);

export default router;
