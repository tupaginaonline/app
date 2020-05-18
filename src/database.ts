import mysql from 'mysql2/promise';

export async function getConnection(nameDB:string | undefined):Promise<mysql.Connection> {
	
	const conex = await mysql.createConnection({
		
		host:process.env.HOST_LOCAL,
		user:process.env.USER_LOCAL,
		password:process.env.PASSWORD_LOCAL,
        database:nameDB,
		connectionLimit:10
		
	});

	return conex;
}