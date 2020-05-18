import {Router} from 'express';
const { body } = require('express-validator');


import {
nuevoDepartamentoRender,
DepartamentosRender,
DepartamentoRender,
updateDepartamento,
nuevoDepartamento

} from '../controllers/departamentos.controller';

import {authenticate} from '../middlewares/authenticate';
import {loadDepartamentos,loadDepartamento} from '../middlewares/departamentos';

const router = Router();

router.get("/departamentos",authenticate, loadDepartamentos, DepartamentosRender);

router.get("/departamentos/nuevo",authenticate, nuevoDepartamentoRender);

router.get("/departamentos/:id",authenticate, loadDepartamento, DepartamentoRender);

router.put("/departamentos/:id",authenticate, [ body('nombre').not().isEmpty().trim().escape()
										],  updateDepartamento);

router.post("/Departamentos/nuevo",authenticate,[ body('nombre').not().isEmpty().trim().escape()
										], nuevoDepartamento);

export default router;