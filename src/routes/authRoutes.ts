 import {Router} from 'express';
import {signin,
signinRender,
signup,
signupRender,
logout} from '../controllers/auth.controller'

import {authenticate,checkAuthenticate} from '../middlewares/authenticate';

const router = Router();

router.get('/login',checkAuthenticate, signinRender);
router.post('/login',checkAuthenticate, signin);

router.get('/registro',authenticate, signupRender);
router.post('/registro',authenticate, signup);

router.delete('/logout', logout);

export default router;