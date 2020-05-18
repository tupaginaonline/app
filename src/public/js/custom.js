$(document).ready(function () {
$('[data-toggle="tooltip"]').tooltip();
	$('#cargos').DataTable();
    $('#tipos_nominas').DataTable();
	$('#departamentos').DataTable();
	$('#sexo').DataTable();
	$('#grupo_sanguineo').DataTable();
	$('#estado_civil').DataTable();

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
	
	const frmSearch = document.querySelector("#frmSearch");
	const search = document.getElementById("search");
	
	
	if(frmSearch){
	frmSearch.addEventListener('submit', (e) => {
		
		e.preventDefault();
		
			if(search.value==""){
						window.location='/cargos';
			}
			
			
			var data = {search: search.value};
			
			(async () => {
				  const rawResponse = await fetch('/cargos/search', {
					method: 'post',
					body: JSON.stringify(data),
					headers:{
						'Content-Type': 'application/json'
					  }
				  });
				  const content = await rawResponse.json();

				  var con='';
				  content.forEach( row => { con+=`<tr>
												  <th scope="row">${row.id}</th>
												  <td>${row.nombre.toUpperCase()}</td>
												  <td>${row.sueldo}</td>
												  <td>${row.sueldovar}</td>
												  <td>${row.descripcion.toUpperCase()}</td>
												   <td><a class="text-primary" href="/cargos/${row.id}">Editar</a></td>
													</tr>`; })
				  
				 
				  document.querySelector('#cargostable').innerHTML = con ;
				  
			})()
			
	})
	
	}

});