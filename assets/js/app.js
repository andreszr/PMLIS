//En este archivo .js se encontrará toda la implementacion con base en angular de nuestro proyecto
//En este se encontraran diferentes controladores dependiendo de que seccion de la aplicacion estemos manipulando

(function() {
	var pmlis = angular.module('pmlis',['ui.router']);

//-------------------------------------Controlador de Prestamos-------------------------------------\\

//Creacion de el controlador para los prestamos.
	pmlis.controller('prestamosController', function(){ //Con un servicio se traen los datos del inventario
		//var inventario = cargarObjetos();
		this.objetos = inventario;
	});

//-------------------------------------Controlador Historial Prestamos--------------------------------\\

//Este controlador tendrá diferentes funciones implementadas, como historial, realizar devolucion entre otras
// acontinuacion se explicara cada una de estas de forma más precisa.

	pmlis.controller('pmlisController', function(){ //Se usa un servicio para leer el historial de Prestamos desde el servidor
		this.prestamos = historialPrestamos;

	//-------------------------------------Funcion Prestamos Vencidos---------------------------------\\
	
	//Esta funcion determinará cuales prestamos ya han plazo establecido de prestamo.	
		this.prestamosVencidos = function(){
			var respuesta = null;
			var vencidos="Los prestamos vencidos son: \n";

			//Uso de XMLHttpRequest para consumir un servicio
			var http = new XMLHttpRequest();
			var url = "http://localhost:8080/PMLISService/webresources/pojo.prestamo/fechaPrestamo/";
			for(var i = 1; i<this.prestamos.length; i++){
				http.open("GET",url+i,false);
				http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				http.onreadystatechange = function() {//Call a function when the state changes.
		    	if(http.readyState == 4 && http.status == 200) {
		    		respuesta= http.responseText;
		    		if(respuesta==="true" && historialPrestamos[i].entregado === false){
		    			vencidos = vencidos + " " + historialPrestamos[i].cedula_estudiante;
		    			
		    		}
			    }
			}
			http.send(null);
		}
		alert(vencidos);
	}

	//-------------------------------------Funcion Realizar Devolucion---------------------------------\\

	// Este metodo se encargara de verificar cuando un prestamo ha sido retornado
		this.realizarDevolucion = function(indiceId,idObjeto){
			indiceId= indiceId + 1;

			//Uso de XMLHttpRequest para consumir un servicio
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

	//-------------------------------------Funcion Devolver Objeto--------------------------------------\\

	//Esta funcion se encargara de modificar el estado del objeto en su recpectiva tabla
		this.devolverObjeto = function(idObjeto){

			//Uso de XMLHttpRequest para consumir un servicio
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

			//Uso de XMLHttpRequest para consumir un servicio
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

//--------------------------------------Panel Controller-----------------------------------------\\

// Este controlador será breve solo contará con dos funciones que seran utlizadas para la navegabilidad de nuestro proyecto
	pmlis.controller('PanelController', function(){
		this.tab = 1;
		this.selectTab = function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
	});

//-------------------------------------Nuevo Prestamo Controller ----------------------------------------\\

//Este controlador tendrá todas las operaciones necesarias para generar adecuadamente un prestamos, para esto
//dispone de diferentes funciones que se explicaran acontinuacion.
	pmlis.controller('nuevoPrestamoController', function(){
		this.nuevoPrestamo;

//------------------------------------Funcion Adicionar Prestamo-----------------------------------------\\

//Esta funcion se encargara de la creacion de un nuevo prestamos, alterando las diferentes entidades necesarias.
		this.addPrestamo = function(){
			var objeto = document.getElementById('object').value;
			var estudiante = this.nuevoPrestamo.usuario;
			var dias = this.nuevoPrestamo.dias;
			var aux = this.nuevoPrestamo.auxiliar;
			alert("Prestamo realizado");

			//Uso de XMLHttpRequest para consumir un servicio
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

			//Uso de XMLHttpRequest para consumir un servicio
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


//--------------------------------------Controlador de Usuarios--------------------------------------\\

//Este controlador tiene como principal funcion la gestion de los usuarios,su metodo principal es el de logear
//este se explicara posteriormente.

	pmlis.controller('userController', ['$state', function($state){
		this.usuario = {};

	//Habrá un if inicial, que determinará cuando un usuario podrá pasar o no del login.
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

	//Esta peticion consumira un servicio Web tipo rest que usará la url definida en la parte de abajo
	//este servicio retornará true, en caso de que los usuarios y contraseñas sean correctas y false en caso contrario.
		this.logear = function(){

			//Uso de XMLHttpRequest para consumir un servicio
			var http = new XMLHttpRequest();
			var usuario;
			var url2 = "http://localhost:1337/usuario?usuario="+this.usuario.usuario;
			console.log(this.usuario.usuario+" y "+ this.usuario.pass);
			var url="http://localhost:8080/PMLISService/webresources/pojo.usuario/login?name="+this.usuario.usuario+"&pass="+this.usuario.pass;
			console.log(url);
			//var params = "objeto="+objeto+"&estudiante="+estudiante+"&dias="+dias+"&aux="+aux;
			http.open("GET", url, false);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			    	respuesta= http.responseText;

			    }
			}
			http.send(null);
			http.open("GET", url2, false);
			//Send the proper header information along with the request
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			    	usuario= JSON.parse(http.responseText);
			    }
			}

		//Se le permitira pasar o no a el usuario que ha intentado loguearse.

			if(respuesta === 'true' && usuario[0].permiso === true){
				localStorage.setItem("permiso","si");
				$state.go('prestamo');
			}
			else if(respuesta === 'true' && usuario[0].permiso === false){
				localStorage.setItem("permiso","no");
				$state.go('prestamo');
			}
			else{
				alert("usuario o contraseña inválidos");
			}
		}
	}]);

//-------------------------------------Controlador para enviar Correo------------------------------------\\

//Este controlador tiene como unico objetivo la gestion necesaria para el envio de el correo electronico, 
//a un administrador.
	pmlis.controller('enviarCorreoController', ['$scope', '$state', 'enviarCorreoService', function ($scope, $state, enviarCorreoService) {
		$scope.enviarCorreoPrestamo = function () {
		    var correo = null;
		    var nombre  = null;
		    console.log("entro enviar correo controller");

		    var credenciales = {
		      nombre: "auxiliar",
		      correo: "sonorks@gmail.com"
		    };
		    $scope.enviando = true;

		    enviarCorreoService.enviarCorreo(credenciales)
		    .success(function(resultado) {
		      $scope.token = resultado;
		      $scope.enviando = false;
		    })
		    .error(function(err) {
		      $scope.mensajeAlerta = "Error, el correo electrónico ingresado no existe.";
		      $scope.enviando = false;
		    });
		}
	}]);

	//Em el siguiente bloque de codigo se consumira el servicio web, para realizar un prestamo

	pmlis.factory('enviarCorreoService', ['$http', function($http){
		return {
			// Inicia el proceso de enviar un correo
			enviarCorreo: function (usuario) {
				var correo = $http({
					url: '/prestamo/realizarPrestamo',
					method: 'POST',
					params: usuario
				});
				return correo;
			},
		}
	}]);

//--------------------------------------Definicion de templates y directivas-------------------------\\

//En esta parte se le asignará un template, a cada una de las directivas creadas, logrando asi la navegabilidad
// esperada para nuestra aplicacion.

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

//------------------------------------------Servicio de Inventario----------------------------------\\

	//Este bloque logica se desarrollo para buscar todos los objetos disponibles y asi crear un
	//inventario para la visualizacion del usuario.

	var inventario =[];

	//Uso de XMLHttpRequest para consumir un servicio
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

//------------------------------------------Servicio Prestamo--------------------------------------//

	//Este servicio pretende encontrar todos los prestamos realizados para asi mostrarlos a los diferentes usuarios.
	var historialPrestamos= [];

	//Uso de XMLHttpRequest para consumir un servicio
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