import {Request,Response} from 'express';
import {getConnection} from '../database';


export const loadEstadosCiviles = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_estado_civil');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.estadosCiviles=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const loadEstadoCivil = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_estado_civil where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.estadoCivil = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el estado civil');
		
		res.redirect('/estado-civil');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}