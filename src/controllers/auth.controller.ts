import { Request, Response } from 'express';
import {getConnection} from '../database';
import bcrypt from 'bcrypt';
import passport from 'passport';

export  const signinRender = (req:Request, res:Response): void => {
	return res.render('login');
}

export  const signin = passport.authenticate("local",{
	successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
});


export  const signupRender = (req:Request, res:Response): void => {
	return res.render('registro');
}


export  const signup = async(req:Request, res:Response): Promise<void> => {
	
	const { email, password } = req.body;
	
	try{
		
		if(!email){
			
			req.flash('msgWarning','Email empty..');
			return res.redirect("/registro");
		}
		
		const conn = await getConnection();
	
		const [result] = await conn.query("SELECT * FROM users where email = ?",[email]);
		
		const user = JSON.parse(JSON.stringify(result));
		
		if(user.length == 0){
			
			const hashedPassword = await bcrypt.hash(password,10);
			
const newUser = await conn.query("INSERT INTO users (email,password) values (?,?)",[email,hashedPassword]);
			
			req.flash('msgSuccess','New user created successfully!');
			
			return res.redirect("/registro");
			
		}else{
			
			req.flash('msgWarning','Email already exist!!');
			return res.redirect("/registro");
		}
		
		
	}catch(err){
		console.log(err);
		req.flash('msgDanger',err.message);
		return res.redirect("/registro");
	}
	
}


export const logout = (req:Request, res:Response): Response | void => {
	
	req.logout();
	
	return res.redirect('/');
}