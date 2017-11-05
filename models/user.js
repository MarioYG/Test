var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// conexion a la base de datos
mongoose.connect("mongodb://localhost/primera", { useMongoClient: true });
// definicion de posibles valores
var posibles_valores=["M","F"];

// Defiinicion del Schema que seria las tablas en la base de datos

var user_schema = new Schema({
	name: String,
	username: {type:String,required:true,
				maxlength:[50,"Username es muy grande"]},
	// autentuficacion required:true es obligatorio
	password: {type:String,
				minlength:[8,"Username es muy corto"],
				validate: {
					validator: function(p){
						return this.password_confirmation == p;
					},
					message: "Las contraseñas no son iguales"
					// creacion de la propia forma de validacion
				}
			},
	age:{type: Number,
		min:[5,"La edad no puede ser menor que 5"],
		max:[100,"La edad no puede ser mayor que 100"]},
	email: {type: String,
			required: "El correo es obligatorio"},
	date: Date,
	sex: {type:String,enum:{values:"posibles_valores",
							message:"Opcion no válida"}}
});

// creacion de un getter y setter virtual no pertenece a la tabla
user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});
// User es el nombre en la base de datos de la tabla
var User = mongoose.model("User",user_schema);
// exportacion del modelo usuario
module.exports.User = User;