/**
 * PrestamoController
 *
 * @description :: Server-side logic for managing prestamos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	realizarPrestamo: function(req, res) {
		console.log(req.param('nombre'));
		console.log(req.param('correo'));
		MailerService.enviarCodigo(req.param('nombre'), req.param('correo'));
		res.ok();
	}
};

