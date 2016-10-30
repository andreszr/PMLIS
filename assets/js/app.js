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
		this.nuevoPrestamo;
		this.addPrestamo = function(){
			var objeto = "goPro";
			var estudiante = this.nuevoPrestamo.usuario;
			var dias = this.nuevoPrestamo.dias;
			var aux = this.nuevoPrestamo.auxiliar;
			alert("Prestamo realizado"+objeto+estudiante+dias+aux);
			var http = new XMLHttpRequest();
			var url = "http://localhost:1337/prestamo";
			var params = "objeto="+objeto+"&estudiante="+estudiante+"&dias="+dias+"&aux="+aux;
			http.open("POST", url, true);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			        alert(http.responseText);
			    }
			}
			http.send(params);
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
		this.usuario = {};
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
			var http = new XMLHttpRequest();
			var usuario;
			var url = "http://localhost:1337/user?nombre="+this.usuario.usuario;
			//var params = "objeto="+objeto+"&estudiante="+estudiante+"&dias="+dias+"&aux="+aux;
			http.open("GET", url, false);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			    	usuario= JSON.parse(http.responseText);
			    }
			}
			http.send(null);
			if(usuario[0].permiso){
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
	var historialPrestamos= [];
	var http = new XMLHttpRequest();
	var url = "http://localhost:1337/prestamo";
	//var params = "objeto="+objeto+"&estudiante="+estudiante+"&dias="+dias+"&aux="+aux;
	http.open("GET", url, true);
	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	    	historialPrestamos= http.responseText;
	        historialPrestamos = JSON.parse(historialPrestamos);
	    }
	}
	http.send(null);
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
})();