import {Request,Response} from 'express';
import {getConnection} from '../database';


export const loadDepartamentos = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_departamentos');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.departamentos=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const loadDepartamento = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_departamentos where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.departamento = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el departamento');
		
		res.redirect('/departamentos');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}