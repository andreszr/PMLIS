module.exports = {

	enviarCodigo: function (usuario, correo) {
			sails.hooks.email.send("", {usuario},
			{to: correo,
			subject: "Prestamo pmlis"},
			function(err) {
			});
	}
};