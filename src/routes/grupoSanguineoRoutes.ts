import { Router, Request } from 'express';
const { body } = require('express-validator');


import {
nuevoGrupoSanguineoRender,
grupoSanguineosRender,
grupoSanguineoRender,
updateGrupoSanguineo,
nuevoGrupoSanguineo

} from '../controllers/grupoSanguineo.controller';

import {authenticate} from '../middlewares/authenticate';
import {loadGruposSanguineos,loadGrupoSanguineo} from '../middlewares/grupoSanguineo';

const router = Router();

router.get("/grupos-sanguineos",authenticate, loadGruposSanguineos, grupoSanguineosRender);

router.get("/grupos-sanguineos/nuevo",authenticate, nuevoGrupoSanguineoRender);

router.get("/grupos-sanguineos/:id",authenticate, loadGrupoSanguineo, grupoSanguineoRender);

router.put("/grupos-sanguineos/:id",authenticate, [ body('nombre').not().isEmpty().trim().escape()],  updateGrupoSanguineo);

router.post("/grupos-sanguineos/nuevo",authenticate,[ body('nombre').not().isEmpty().trim().escape()], nuevoGrupoSanguineo);

export default router;