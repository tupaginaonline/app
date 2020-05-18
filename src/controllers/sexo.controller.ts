import { Request, Response } from 'express';
import {getConnection} from '../database';
const { validationResult } = require('express-validator');
 

export const nuevoSexo =  async (req:any,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/sexo/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into non_sexo (nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo sexo');
		
		res.status(201).redirect('/sexo');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/sexo/nuevo');
		
	}

	
}


export const updateSexo = async(req:any,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/sexo/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update non_sexo set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el sexo');
		
		res.status(201).redirect('/sexo');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/sexo/nuevo');
		
	}
  
	
};


export const sexoRender = (req:any,res:Response) => {
	
	res.render("edit-sexo", {sexo:req.sexo});
	
}

export const sexosRender = (req:any,res:Response) => {
	
	res.render("sexo",{results:req.sexos});
	
};

export const nuevoSexoRender = (req:Request,res:Response)=>{
	res.render("nuevo-sexo");
}




