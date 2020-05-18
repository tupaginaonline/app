import { Router, Request } from 'express';
const { body } = require('express-validator');


import {
nuevoCargoRender,
cargosRender,
cargoRender,
updateCargo,
nuevoCargo,search

} from '../controllers/cargos.controller';

import {authenticate} from '../middlewares/authenticate';
import {loadCargos,loadCargo} from '../middlewares/cargos';

const router = Router();

router.get("/cargos",authenticate, loadCargos, cargosRender);

router.get("/cargos/nuevo",authenticate, nuevoCargoRender);

router.post("/cargos/search",authenticate, search);

router.get("/cargos/:id",authenticate, loadCargo, cargoRender);

router.put("/cargos/:id",authenticate, [ body('nombre').not().isEmpty().trim().escape(),
										body('sueldo').not().isEmpty().isFloat(),
										body('sueldovar').not().isEmpty().isFloat(),
										body('descripcion').not().isEmpty().trim().escape()
										],  updateCargo);

router.post("/cargos/nuevo",authenticate,[ body('nombre').not().isEmpty().trim().escape(),
										body('sueldo').not().isEmpty().isFloat(),
										body('sueldovar').not().isEmpty().isFloat(),
										body('descripcion').not().isEmpty().trim().escape()
										], nuevoCargo);

export default router;