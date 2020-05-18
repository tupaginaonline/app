import {Request,Response} from 'express';
import {getConnection} from '../database';


export const loadTiposNominas = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_tipos_nominas');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.tiposNominas=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const loadTipoNomina = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_tipos_nominas where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.tipoNomina = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el tipo de nomina');
		
		res.redirect('/tipos-nominas');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}