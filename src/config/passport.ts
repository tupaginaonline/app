import passport from 'passport';
import {Strategy}  from 'passport-local';
import {getConnection} from '../database';
import {Request} from 'express';
import bcrypt from 'bcrypt';
import {IUser} from '../interfaces/user.interface';

async function authenticateUser(req:Request,email:string,password:string,done:Function): Promise<Function> {
	
	try{
		
		const conn = await getConnection();
		
		const [result] = await conn.query("SELECT * from users where email = ?",[email]);
		
		const user = JSON.parse(JSON.stringify(result));
		
		if(user.length > 0){
			
			// compare password
			
			if(await bcrypt.compare(password, user[0].password))
			{
				return done(null,user[0], req.flash('msgSuccess','Login success'));
			}
			
		}
		
		return done(null,false,req.flash('msgWarning','Email not match...'));
		
	}catch(e){
		
		
		return done(null,false, req.flash('msgDanger',e.message));
		
	}
	
}

passport.use(
	new Strategy(
	{
		usernameField:'email',
		passReqToCallback : true
	}, authenticateUser)

);

passport.serializeUser( (user:IUser,done) => {
	done(null,user.id);
});

passport.deserializeUser( async(id,done):Promise<Function | void> => {
	
	try{
		
		const conn = await getConnection();
		
		const [result] = await conn.query("SELECT * from users where id = ?",[id]);
		
		const users = JSON.parse(JSON.stringify(result));
		
		if(users.length > 0){
			
			const user:IUser = users[0];
			
			return done(null,user);
		}else{
			return done(null,false);	
		}
		
	}catch(e){
		return done(null,false);	
	}	
	
	
});

