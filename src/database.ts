import dotenv  from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

export async function getConnection():Promise<mysql.Connection> {
	
	const conex = await mysql.createConnection({
		
		host:process.env.HOST_CLEVER_CLOUD,
		user:process.env.USER_CLEVER_CLOUD,
		password:process.env.PASSWORD_CLEVER_CLOUD,
        database:process.env.DATABASE_CLEVER_CLOUD,
		connectionLimit:10
		
	});

	return conex;
}