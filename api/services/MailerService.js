module.exports = {

	enviarCodigo: function (usuario, correo) {
			sails.hooks.email.send("prestamoEmail", {nombre: usuario},
			{to: correo,
			subject: "Prestamo pmlis"},
			function(err) {
			});
	}
};