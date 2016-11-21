(function() {
	var pmlis = angular.module('pmlis',['ui.router']);

	pmlis.controller('prestamosController', function(){ //Con un servicio se traen los datos del inventario
		//var inventario = cargarObjetos();
		this.objetos = inventario;
	});

	pmlis.controller('pmlisController', function(){ //Se usa un servicio para leer el historial de Prestamos desde el servidor
		//var historialPrestamos = cargarHistorial();
		this.prestamos = historialPrestamos;
		this.realizarDevolucion = function(indiceId,idObjeto){
			indiceId= indiceId + 1;
			var http = new XMLHttpRequest();
			var url = "http://localhost:1337/prestamo/"+indiceId;
			var params = "entregado=true";
			http.open("PUT", url, false);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			        alert("Devolucion realizada");
			    }
			}
			http.send(params);
			this.devolverObjeto(idObjeto);
		}
		this.devolverObjeto = function(idObjeto){
			var http = new XMLHttpRequest();
			var url = "http://localhost:1337/objeto?id_objeto="+idObjeto;
			http.open("GET", url, false);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
		    	if(http.readyState == 4 && http.status == 200) {
		    		inventario= http.responseText;
		    	    inventario = JSON.parse(inventario);
			    }
			}
			http.send(null);

			var http2 = new XMLHttpRequest();
			var url2 = "http://localhost:1337/objeto/"+inventario[0].id;
			var params = "disponibilidad=true";
			http2.open("PUT", url2, false);
			//Send the proper header information along with the request
			http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http2.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			        
			    }
			}
			http2.send(params);	
			}
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
			var objeto = document.getElementById('object').value;
			var estudiante = this.nuevoPrestamo.usuario;
			var dias = this.nuevoPrestamo.dias;
			var aux = this.nuevoPrestamo.auxiliar;
			alert("Prestamo realizado");
			var http = new XMLHttpRequest();
			var url = "http://localhost:1337/prestamo";
			var params = "id_objeto="+objeto+"&cedula_estudiante="+estudiante+"&dias_plazo="+dias+"&aux="+aux+"&entregado=false";
			http.open("POST", url, false);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			        alert(http.responseText);
			    }
			}
			http.send(params);
			var http2 = new XMLHttpRequest();
			var url2 = "http://localhost:1337/objeto/"+inventario[this.getIndice()].id;
			var params = "disponibilidad=false";
			http2.open("PUT", url2, false);
			//Send the proper header information along with the request
			http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http2.onreadystatechange = function() {//Call a function when the state changes.
			    if(http2.readyState == 4 && http2.status == 200) {
			        alert(http2.responseText);
			    }
			}
			http2.send(params);
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
			var url = "http://localhost:1337/usuario?usuario="+this.usuario.usuario;
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
	var inventario =[];
		var http = new XMLHttpRequest();
		var url = "http://localhost:1337/objeto";
		http.open("GET", url, false);
		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.onreadystatechange = function() {//Call a function when the state changes.
		    if(http.readyState == 4 && http.status == 200) {
		    	inventario= http.responseText;
		        inventario = JSON.parse(inventario);
		    }
		}
		http.send(null);

	var historialPrestamos= [];
		var http = new XMLHttpRequest();
		var url = "http://localhost:1337/prestamo";
		http.open("GET", url, false);
		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.onreadystatechange = function() {//Call a function when the state changes.
		    if(http.readyState == 4 && http.status == 200) {
		    	historialPrestamos= http.responseText;
		        historialPrestamos = JSON.parse(historialPrestamos);
		    }
		}
		http.send(null);	
	
})();