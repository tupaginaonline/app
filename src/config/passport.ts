import passport from 'passport';
import {Strategy}  from 'passport-local';
import {getConnection} from '../database';
import {Request} from 'express';
import bcrypt from 'bcrypt';
import {IUser} from '../interfaces/user.interface';

async function authenticateUser(req:Request,email:string,password:string,done:Function): Promise<Function> {
	
	try{
		
		const BD = `${process.env.PREFIJO_APP}${req.body.codigo}`;
		
		const conn = await getConnection(BD);
		
		const [result] = await conn.query("SELECT * from users where email = ?",[email]);
		
		const userR = JSON.parse(JSON.stringify(result));
		
		if(userR.length > 0){
			
			// compare password
			
			if(await bcrypt.compare(password, userR[0].password))
			{
				
				const user:IUser = userR[0];
				
				user.bd = BD;
				
				return done(null,user, req.flash('msgSuccess','Login success'));
			}
			
		}
		
		return done(null,false,req.flash('msgWarning','Email not match...'));
		
	}catch(e){
		
		return done(null,false, req.flash('msgDanger',"Error interno. comunicarse con soporte"));
		
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
	done(null,user);
});

passport.deserializeUser( async(u:IUser,done):Promise<Function | void> => {
	
	try{
		
		const conn = await getConnection(u.bd);
		
		const [result] = await conn.query("SELECT * from users where id = ?",[u.id]);
		
		const users = JSON.parse(JSON.stringify(result));
		
		if(users.length > 0){
			
			const user:IUser = users[0];
			
			user.bd = u.bd;
			
			//console.log(`user: ${user.bd}`);
			
			return done(null,user);
		}else{
			return done(null,false);	
		}
		
	}catch(e){
		return done(null,false);	
	}	
	
	
});

