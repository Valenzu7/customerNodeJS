var mongoose=require("mongoose")
var Schema=mongoose.Schema

var valores_sexo=["M","F"]
var email_regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
var validaPasswordsIguales=(p)=>{
	return this.pass_conf==p
}


var userSchemaJSON={
	nombre:{type:String, require:true, minlength:3},//Así le damos atributos
	email:{type:String, require:"Este campo es obligatorio", match:[email_regex,"Está mal escribido"]},
	password:{
		type:String, 
		minlength:[6,"La contraseña ha de tener como mínimo 6 caracteres"], 
		require:"Campo obligatorio" ,
		validate:{validator:validaPasswordsIguales, message:"Las contraseñas no coinciden"}
	},
	edad:{
		type:Number,
		min:[2,"Si tienes menos de 2 no puedes entrar, chínchate"],
		max:[140,"Eres un poco mayor para esto"]
	},
	fecha_nac: Date,
	sexo:{type:String, enum:{values:valores_sexo , message:"Opción de sexo no válida"}}
}

var userSchema=new Schema(userSchemaJSON)
var User=mongoose.model('User', userSchema)

//Atributo tipo virtual(que no se guarda en la base de datos)
userSchema.virtual("confirmacion_password").get( ()=>{
	return this.pass_conf
}).set( (password)=>{
	this.pass_conf=password
})

module.exports.User=User