import dotenv  from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

export async function getConnection():Promise<mysql.Connection> {
	
	const conex = await mysql.createConnection({
		
		host:process.env.HOST_LOCAL,
		user:process.env.USER_LOCAL,
		database:process.env.DATABASE_LOCAL
		
	});

	return conex;
}