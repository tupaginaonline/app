import {Request,Response} from 'express';

interface IPaginationResults {
		
		next?:{page:number,limit:number},
		previous?:{page:number,limit:number},
		results?:{}[],
}

export  const paginatedResults = (tabla:any) => {

return (req:any,res:any,next:Function) => {
	        const results:IPaginationResults = { };
				
				/*const page = req.query.page ? parseInt(req.query.page) : 1;
				
				const limit = req.query.limit ? parseInt(req.query.limit) : 5;
				
				const startIndex = (page -1 ) * limit;
				
				const endIndex = page * limit;
				
				const results:IPaginationResults = { };
				
				if(endIndex < req[tabla].length){
					 results.next = {
						 page:page+1,
						 limit
					 } 
				}
				
				 
				if(startIndex > 0){
					results.previous = {
						 page:page-1,
						 limit
					} 
				 }
				 results.results = req[tabla].slice(startIndex,endIndex);
				*/
				
				
				//console.log(results);
				results.results = req[tabla];
				res.paginatedResults = results;
			   
				next();
		
	}
		

}