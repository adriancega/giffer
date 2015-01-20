
// models/User.js

module.exports = function (mongoose) {
	'use strict';

	var Schema = mongoose.Schema;

	var UserSchema = new Schema({

		// Propiedad nombre
		name: String,

		// Propiedad nombre
		name: String,

		// Propiedad fecha de nacimiento
		birthdate: Date,

		// Propiedad isAdmin
		isAdmin: Boolean
	});

	// Método para calcular la edad a partir de la fecha de nacimiento
	UserSchema.methods.age = function () {

		return ~((Date.now() - this.birthdate) / 31557600000);
	}

	return mongoose.model( 'User', UserSchema );
};