import { Router, Request } from 'express';
const { body } = require('express-validator');


import {
nuevoEstadoCivilRender,
estadoCivilsRender,
estadoCivilRender,
updateEstadoCivil,
nuevoEstadoCivil

} from '../controllers/EstadoCivil.controller';

import {authenticate} from '../middlewares/authenticate';
import {loadEstadosCiviles,loadEstadoCivil} from '../middlewares/estadoCivil';

const router = Router();

router.get("/estado-civil",authenticate, loadEstadosCiviles, estadoCivilsRender);

router.get("/estado-civil/nuevo",authenticate, nuevoEstadoCivilRender);

router.get("/estado-civil/:id",authenticate, loadEstadoCivil, estadoCivilRender);

router.put("/estado-civil/:id",authenticate, [ body('nombre').not().isEmpty().trim().escape()],  updateEstadoCivil);

router.post("/estado-civil/nuevo",authenticate,[ body('nombre').not().isEmpty().trim().escape()], nuevoEstadoCivil);

export default router;