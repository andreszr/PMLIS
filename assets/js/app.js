(function() {
	var app = angular.module('pmlis',[]);

	app.controller('prestamosController', function(){ //Con un servicio se traen los datos del inventario
		this.objetos = inventario;
	});

	app.controller('pmlisController', function(){ //Se usa un servicio para leer el historial de Prestamos desde el servidor
		this.prestamos = historialPrestamos;
	});

	app.controller('PanelController', function(){
		this.tab = 1;
		this.selectTab = function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
	});

	app.controller('nuevoPrestamoController', function(){
		this.nuevoPrestamo = prestamo;
		this.addPrestamo = function(){
			prestamo.push(this.nuevoPrestamo);
			localStorage.setItem("prestamo",prestamo);
			alert("Prestamo realizado");
			document.getElementById('prestamoDiv').style.display = "none";
		}
		this.setPrestar = function (index) {
			this.indice = index;
			document.getElementById('prestamoDiv').style.display = "block";
		}
		this.getIndice = function(){
			return this.indice;
		}
			
	});

	app.controller('userController', function(){
		this.usuario = user;
		if(localStorage.permiso === "si"){
			this.permiso = true;
		}
		else{
			this.permiso = false;
		}
		
		this.setPermiso = function(newPermiso){
			this.usuario.permiso = newPermiso;
		};
		this.getPermiso = function(){
			return this.permiso;
		};
		this.logear = function(){
			if(this.usuario.usuario === "root"){
				localStorage.setItem("permiso","si");
			}
			else{
				localStorage.setItem("permiso","no");
			}
			location.href='prestamos.html';
		}
	});

	app.directive('navBar', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/nav-bar.html'
		};
	});
	app.directive('footerHtml', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/footer.html'
		};
	});

	app.directive('nuevoPrestamo', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/nuevoPrestamo.html'
		};
	});

	var historialPrestamos =[ {
		objeto: 'GoPro Hero2',
		estudiante: 'Julian Vasquez',
		fechaPrestamo: 'Ayer',
		fechaEntrega: 'Manana',
		entregado: 'Si',
	},
	{
		objeto: 'Router Cisco',
		estudiante: 'Travis Barker',
		fechaPrestamo: 'Ayer',
		fechaEntrega: 'Manana',
		entregado: 'No',
		
	}	
	];
	var inventario =[
	{
		nombre: 'GoPro',
		cantidad: 1,
		descripcion:'. . .',
		disponible : false,
		imagen: [
			{
				full:'../images/gopro.jpg'
			}
		]
	},
	{
		nombre: 'Cisco 1',
		cantidad: 3,
		descripcion: '. . .',
		disponible: false,
		imagen: [
			{
				full:'../images/cisco.jpg'
			}
		]
	}
	];
	var user = {
		usuario: '',
		pass: '',
		permiso: true
	}
	var prestamo = [
	{
		dias:'2', 
		usuario:'1035436986', 
		auxiliar:'yo'
	}
	]

})();