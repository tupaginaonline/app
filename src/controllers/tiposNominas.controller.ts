import { Request, Response } from 'express';
import {getConnection} from '../database';
const { validationResult } = require('express-validator');

export const nuevoTiposNominas =  async (req:any,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/tipos-nominas/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into non_tipos_nominas (nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente');
		
		res.status(201).redirect('/tipos-nominas');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/tipos-nominas/nuevo');
		
	}

	
}


export const updateTiposNominas = async(req:any,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/tipos-nominas/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update non_tipos_nominas set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente ');
		
		res.status(201).redirect('/tipos-nominas');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/tipos-nominas/nuevo');
		
	}
  
	
};


export const tipoNominasRender = (req:any,res:Response) => {
	
	res.render("edit-tipo-nomina", {tipoNomina:req.tipoNomina});
	
}

export const tiposNominasRender = (req:any,res:Response) => {
	
	res.render("tipo-nomina",{results:req.tiposNominas});
	
};

export const nuevoTiposNominasRender = (req:Request,res:Response)=>{
	res.render("nuevo-tipo-nomina");
}




