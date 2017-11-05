var express = require("express");
var bodyParser = require("body-parser");
// paso de metodos en USer
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./routes_app");
var app = express();
var session_middleware = require("./middlewares/session")
// definicion de librerias


app.use(bodyParser.json()); // Para aplicaciones jsn
app.use(bodyParser.urlencoded({extended: true})); 
// definicion de statics public no se modifican esos css o js
app.use(express.static('public'));
// Define la sesion
app.use(session({
	secret: "1234567890",
	resave: false,
	saveUninitialized: false
}));
// Define el uso de jade
app.set("view engine","jade");
 
app.get("/",function(req,res){
	console.log(req.session.user_id);
	res.render("indexx");
});

app.get("/singup",function(req,res){
	User.find(function(err,doc){
		res.render("singup");
	});
});

app.get("/login",function(req,res){
	User.find(function(err,doc){
		res.render("login");
	});
});

app.use("/app",session_middleware);
app.use("/app",router_app);

app.post("/users",function(req,res){
	var user = new User({email: req.body.email,
		password: req.body.password,
		username: req.body.username,
		password_confirmation: req.body.password_confirmation});
	user.save().then(function(us){
		
	},function(err){
		console.log(String(err));

		res.send("No Recibimos tus datos "+ req.body.username );

	});
});
app.post("/session",function(req,res){
	res.send("Hola Mundo");
	User.findOne({email:req.body.email,password:req.body.password},"",function(err,user){
		req.session.user_id = user._id;
		console.log(req)
		res.send("Hola 2");
	});
});
app.listen(8080);