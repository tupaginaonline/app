 import {Router} from 'express';
import {signin,
signinRender,
signup,
signupRender,
logout} from '../controllers/auth.controller'

import {checkAuthenticate} from '../middlewares/authenticate';

const router = Router();

router.get('/login',checkAuthenticate, signinRender);
router.post('/login',checkAuthenticate, signin);

router.get('/registro',checkAuthenticate, signupRender);
router.post('/registro',checkAuthenticate, signup);

router.delete('/logout', logout);

export default router;