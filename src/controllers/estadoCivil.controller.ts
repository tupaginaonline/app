import { Request, Response } from 'express';
import {getConnection} from '../database';
const { validationResult } = require('express-validator');
 

export const nuevoEstadoCivil =  async (req:any,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/estado-civil/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into non_estado_civil(nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo grupo sanguineo');
		
		res.status(201).redirect('/estado-civil');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/estado-civil/nuevo');
		
	}

	
}


export const updateEstadoCivil = async(req:any,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/estado-civil/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
		await conn.query("update non_estado_civil set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el grupo sanguineo');
		
		res.status(201).redirect('/estado-civil');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/estado-civil/');
		
	}
  
	
};


export const estadoCivilRender = (req:any,res:Response) => {
	
	res.render("edit-estado-civil", {estado_civil:req.estadoCivil});
	
}

export const estadoCivilsRender = (req:any,res:Response) => {
	
	res.render("estado-civil",{results:req.estadosCiviles});
	
};

export const nuevoEstadoCivilRender = (req:Request,res:Response)=>{
	res.render("nuevo-estado-civil");
}




