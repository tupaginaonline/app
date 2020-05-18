import {Request,Response} from 'express';
import {getConnection} from '../database';


export const loadSexos = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_sexo');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.sexos=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const loadSexo = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_sexo where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.sexo = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el sexo');
		
		res.redirect('/sexo');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}