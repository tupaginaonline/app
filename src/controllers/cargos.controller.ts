import { Request, Response } from 'express';
import {getConnection} from '../database';
const { validationResult } = require('express-validator');

export const search = async(req:any,res:Response):Promise<Response | void> => {
	
	const { search } = req.body;
	
	
	try{
		
		const conn = await getConnection(req.user.bd);
		
		const [results] = await conn.query('select * from non_cargos where nombre REGEXP ? ',[search]) ;
		
		const row = JSON.parse(JSON.stringify(results));
	
		return res.json(row)
		
	}catch(e){
		
		return res.status(500).json({error:e.message})
	}
	
	
	
	
}

export const nuevoCargo =  async (req:any,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/cargos/nuevo');
  }
	
	
	try{
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into non_cargos (nombre,sueldo,sueldovar,descripcion) values(?,?,?,?)",[nombre,sueldo,sueldovar,descripcion]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo cargo');
		
		res.status(201).redirect('/cargos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/cargos/nuevo');
		
	}

	
}


export const updateCargo = async(req:any,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/cargos/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update non_cargos set nombre=?, sueldo=?,sueldovar=?,descripcion=? where id=?",[nombre,sueldo,sueldovar,descripcion,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el cargo');
		
		res.status(201).redirect('/cargos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/cargos/nuevo');
		
	}
  
	
};


export const cargoRender = (req:any,res:Response) => {
	
	res.render("edit-cargo", {cargo:req.cargo});
	
}

export const cargosRender = (req:any,res:Response) => {
	
	res.render("cargos",{results:req.cargos});
	
};

export const nuevoCargoRender = (req:Request,res:Response)=>{
	res.render("nuevo-cargo");
}




