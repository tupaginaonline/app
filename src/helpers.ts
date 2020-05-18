interface IHelpersFunction{
	UpperCase:Function;
	
}


export const helpersFunctions:IHelpersFunction = { UpperCase(){} } ;



helpersFunctions.UpperCase = (cadena:string):string => {
	
	return cadena.replace(/\b\w/g, l => l.toUpperCase());
	
}
