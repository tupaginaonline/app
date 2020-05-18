import { Request, Response } from 'express';
import {getConnection} from '../database';
const { validationResult } = require('express-validator');

export const nuevoDepartamento =  async (req:any,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/departamentos/nuevo');
  }
	
	
	try{
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into non_departamentos (nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo Departamento');
		
		res.status(201).redirect('/departamentos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/Departamentos/nuevo');
		
	}

	
}


export const updateDepartamento = async(req:any,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/departamentos/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update non_departamentos set nombre=?  where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el Departamento');
		
		res.status(201).redirect('/departamentos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/departamentos/nuevo');
		
	}
  
	
};


export const DepartamentoRender = (req:any,res:Response) => {
	console.log(req.departamento);
	res.render("edit-departamento", {departamento:req.departamento});
	
}

export const DepartamentosRender = (req:any,res:Response) => {
	
	res.render("departamentos",{results:req.departamentos});
	
};

export const nuevoDepartamentoRender = (req:Request,res:Response)=>{
	res.render("nuevo-departamento");
}




