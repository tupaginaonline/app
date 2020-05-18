import {Request,Response} from 'express';
import {getConnection} from '../database';


export const loadGruposSanguineos = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_grupo_sanguineo');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.grupoSanguineos=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const loadGrupoSanguineo = async(req:any,res:Response,next:Function):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from non_grupo_sanguineo where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.grupoSanguineo = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el grupo sanguineo');
		
		res.redirect('/grupos-sanguineos');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}