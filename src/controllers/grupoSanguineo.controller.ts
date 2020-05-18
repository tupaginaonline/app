import { Request, Response } from 'express';
import {getConnection} from '../database';
const { validationResult } = require('express-validator');
 

export const nuevoGrupoSanguineo =  async (req:any,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/grupos-sanguineos/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into non_grupo_sanguineo(nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo grupo sanguineo');
		
		res.status(201).redirect('/grupos-sanguineos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/grupos-sanguineos/nuevo');
		
	}

	
}


export const updateGrupoSanguineo = async(req:any,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/grupos-sanguineos/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update non_grupo_sanguineo set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el grupo sanguineo');
		
		res.status(201).redirect('/grupos-sanguineos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/grupos-sanguineos/nuevo');
		
	}
  
	
};


export const grupoSanguineoRender = (req:any,res:Response) => {
	
	res.render("edit-grupo-sanguineo", {grupo_sanguineo:req.grupoSanguineo});
	
}

export const grupoSanguineosRender = (req:any,res:Response) => {
	
	res.render("grupo-sanguineo",{results:req.grupoSanguineos});
	
};

export const nuevoGrupoSanguineoRender = (req:Request,res:Response)=>{
	res.render("nuevo-grupo-sanguineo");
}




