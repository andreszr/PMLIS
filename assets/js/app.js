(function() {
	var pmlis = angular.module('pmlis',['ui.router']);

	pmlis.controller('prestamosController', function(){ //Con un servicio se traen los datos del inventario
		this.objetos = inventario;
	});

	pmlis.controller('pmlisController', function(){ //Se usa un servicio para leer el historial de Prestamos desde el servidor
		this.prestamos = historialPrestamos;
	});

	pmlis.controller('PanelController', function(){
		this.tab = 1;
		this.selectTab = function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
	});

	pmlis.controller('nuevoPrestamoController', function(){
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

	pmlis.controller('userController', ['$state', function($state){
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
			$state.go('prestamo');
		}
	}]);

	pmlis.directive('navBar', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/nav-bar.html'
		};
	});
	pmlis.directive('footerHtml', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/footer.html'
		};
	});
	pmlis.directive('prestamoHtml', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/prestamos.html'
		};
	});
	pmlis.directive('loginHtml', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/login.html'
		};
	});
	pmlis.directive('historialHtml', function(){
		return{
			restrict: 'E',
			templateUrl: '../templates/historial.html'
		};
	});
	pmlis.directive('nuevoPrestamo', function(){
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