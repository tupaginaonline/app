import { Router, Request } from 'express';
const { body } = require('express-validator');


import {
nuevoSexoRender,
sexosRender,
sexoRender,
updateSexo,
nuevoSexo

} from '../controllers/sexo.controller';

import {authenticate} from '../middlewares/authenticate';
import {loadSexos,loadSexo} from '../middlewares/sexo';

const router = Router();

router.get("/sexo",authenticate, loadSexos, sexosRender);

router.get("/sexo/nuevo",authenticate, nuevoSexoRender);

router.get("/sexo/:id",authenticate, loadSexo, sexoRender);

router.put("/sexo/:id",authenticate, [ body('nombre').not().isEmpty().trim().escape()],  updateSexo);

router.post("/sexo/nuevo",authenticate,[ body('nombre').not().isEmpty().trim().escape()], nuevoSexo);

export default router;