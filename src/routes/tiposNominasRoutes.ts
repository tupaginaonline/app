import {Router} from 'express';
const { body } = require('express-validator');

import {
nuevoTiposNominasRender,
tiposNominasRender,
tipoNominasRender,
updateTiposNominas,
nuevoTiposNominas

} from '../controllers/tiposNominas.controller';

import {authenticate} from '../middlewares/authenticate';
import {loadTiposNominas,loadTipoNomina} from '../middlewares/TiposNominas';

const router = Router();

router.get("/tipos-nominas",authenticate, loadTiposNominas, tiposNominasRender);

router.get("/tipos-nominas/nuevo",authenticate, nuevoTiposNominasRender);

router.get("/tipos-nominas/:id",authenticate, loadTipoNomina, tipoNominasRender);

router.put("/tipos-nominas/:id",authenticate, [ body('nombre').not().isEmpty().trim().escape()
										],  updateTiposNominas);

router.post("/tipos-nominas/nuevo",authenticate,[ body('nombre').not().isEmpty().trim().escape()
										], nuevoTiposNominas);

export default router;