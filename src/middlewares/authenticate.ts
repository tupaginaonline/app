import {Request, Response} from 'express';

export const authenticate = (req:Request, res:Response ,next:Function ): Function | void => {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('msgWarning', 'No estas autorizado...');
	return res.redirect('/login');
}


export const checkAuthenticate = (req:Request, res:Response ,next:Function ): Function | void => {
	
	if(req.isAuthenticated()){
		return res.redirect('/');
	}
	
   return next();
 }