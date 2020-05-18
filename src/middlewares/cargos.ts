import {Request,Response} from 'express';
import {getConnection} from '../database';


export const loadCargos = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_cargos');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.cargos=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const loadCargo = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_cargos where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.cargo = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el cargo');
		
		res.redirect('/cargos');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}