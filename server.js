const express = require('express')
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express()
const port = 3000
var MySQL = require('./MySQL');
const path = require('path');
var crypto = require('crypto'); //pour crypter les mdp en md5

app.use(session({secret: 'todotopsecret'}))
app.use(express.static('statique'))
app.use(express.static('views'))
/**********************************************************************************************/
/******************************** Les routes**************** **********************************/
/**********************************************************************************************/
app.get('/', (request, response) => {
  response.render('login.ejs', {message:""});
  //response.sendFile(__dirname + '/views/login.ejs');
})
app.post('/redirectUser',urlencodedParser,(request, response) => {
	////console.log(request.body.login)
	////console.log(request.body.password)
	password= crypto.createHash('md5').update(request.body.password).digest("hex");
	////console.log(password)
	//on doit vérifier tout d'abord que notre user existe dans la base de données soit comme étant un adhérant soit un administrator
	MySQL.isAdmin(request.body.login,password,AdminAuthentificationCallback,response);
})

app.post('/insertEmprunt',urlencodedParser,(request, response) => {
	var student = request.body.student 
	var book = request.body.book 
	var date = request.body.date 
	console.log("--------------------")
	cin = student.split("-")[0]
	console.log(cin)
	idLivre = book.split("-")[0]
	console.log(cin)
	console.log(idLivre)
	console.log(date)
	MySQL.insertEmprunt(response,cin,idLivre,date);
})

app.post('/insertRetour',urlencodedParser,(request, response) => {
	var student = request.body.student 
	var book = request.body.book 

	console.log("--------------------")
	cin = student.split("-")[0]
	console.log(cin)
	idLivre = book.split("-")[0]
	console.log(cin)
	console.log(idLivre)

	MySQL.insertRetour(response,cin,idLivre);
})


app.get('/deconnexion/', (request, response) => {
  	response.render('login.ejs', {message:"Deconnecté"});
})
app.get('/getAdminHomePage/:id', (request, response) => {
 	MySQL.getDashboardInfos(request,response,getDashboardInfosCallback)
  //response.sendFile(__dirname + '/views/dashboard.html');
})
app.get('/getStudentHomePage/:id', (request, response) => {
  //response.sendFile(__dirname + '/views/user.html');
  //ici on va récupérer tous les infos à propos le user 
  var cin = request.params.id;
  //vérifier que cin existe
  //vérifier qu'il est authentifier
  MySQL.getStudentInfos(cin,request,response,getStudentHomePageCallback)
})
app.get('/getStudentTables/:id', (request, response) => {
  var cin = request.params.id;
  //vérifier que cin existe
  //vérifier qu'il est authentifier
  MySQL.getStudentTables(cin,request,response,getStudentTablesCallback)
})
app.get('/getStudentNotifications/:id', (request, response) => {
  var cin = request.params.id;
  //vérifier que cin existe
  //vérifier qu'il est authentifier
  MySQL.getStudentNotifications(cin,request,response,getStudentNotificationsCallback)
})
app.get('/getAbonnesPage', (request, response) => {
 MySQL.getAbonnesPage(request,response,getAbonnesPageCallback)
 //response.render('abonnes.ejs')
})
app.get('/getEmprunterPage/:msg*?', (request, response) => {
   var msg = request.params.msg;
   MySQL.getEmprunterInfos(request,response,getEmprunterInfosCallback,msg)
})

app.get('/getRetourPage/:msg*?', (request, response) => {
   var msg = request.params.msg;
   MySQL.getRetourInfos(request,response,getRetourInfosCallback,msg)
})

app.get('/getNotificationsPage', (request, response) => {
 MySQL.getAdminNotifications(request,response,getAdminNotificationsCallback)
 //response.render('notificationsAdmin.ejs')
})
app.get('/getLivresPage', (request, response) => {
  MySQL.getAllBooks(request,response,getAllBooksCallback)
})
/**********************************************************************************************/
/******************************** Ici les fonctions callback **********************************/
/**********************************************************************************************/
var getRetourInfosCallback = function(request,response,students,books,msg){
	console.log(students)
	console.log(books)
	response.render('retour.ejs',{students:students,books:books,message:msg})
}
var getEmprunterInfosCallback = function(request,response,students,books,msg){
	console.log(students)
	console.log(books)
	response.render('emprunter.ejs',{students:students,books:books,message:msg})
}
var getAbonnesPageCallback = function(request,response,abonnes){
	console.log(abonnes)
	response.render('abonnes.ejs',{abonnes:abonnes})
}
var getAdminNotificationsCallback = function(request,response,notifications){
	console.log(notifications)
	response.render('notificationsAdmin.ejs',{notifications:notifications})
}
var getAllBooksCallback = function(request,response,books){
	console.log(books)
	response.render('livres.ejs',{books:books})
}
var getDashboardInfosCallback = function(request,response,nbEtudiant,nbBooks,dernierEmprunts){
	//console.log(dernierEmprunts)
	//console.log(nbEtudiant)
	//console.log(nbBooks)
	response.render('dashboard.ejs',{nbEtudiants:nbEtudiant[0].n,nbBooks:nbBooks[0].n,dernierEmprunts:dernierEmprunts})
}
var getStudentNotificationsCallback = function(cin,request,response,Notifications,becareful,warnings){
	console.log("**************************************")
	var notifications=[];
	var Warnings=[];
	var Becareful=[];
	if(Notifications.length != 0){
		notifications=Notifications;
	}
	if(warnings.length != 0){
		Warnings=warnings;
	}
	if(becareful.length != 0){
		Becareful=becareful;
	}
	//console.log(notifications)
	response.render('notifications.ejs',{Notifications:notifications,cin:cin,warnings:Warnings,becareful:Becareful})
}
var getStudentTablesCallback=function(cin,request,response,Books,cin){

	var books=[];
	if(Books.length != 0){
		//console.log(Books)
		books=Books;
	}
	response.render('tables.ejs',{Books:books,cin:cin})
}
var getStudentHomePageCallback=function(request,response,studentInfos,studentBooks){

	if(studentInfos.length !=0){
		//console.log(studentInfos[0])
	}else{
		response.render('login.ejs', {message:"you have to connect!"});
	}
	var infos=studentInfos[0];
	var books=[];
	if(studentBooks.length != 0){
		//console.log(studentBooks[0])
		books=studentBooks;
	}
	
	response.render('user.ejs',{Infos:infos,Books:books})
}
var AdminAuthentificationCallback=function(resultat,login,password,response){
	//console.log("hey i'm the AdminAuthentificationCallback function")
	//console.log(resultat)
	if (resultat !== undefined  && resultat.length !=0 ){
		//req.session.type=1;
		//req.session.authetifcated=1;
		response.redirect('/getAdminHomePage/'+login);
		return;
	}
	resultat = MySQL.isStudent(login,password,StudentAuthentificationCallback,response);	
}
var StudentAuthentificationCallback=function(resultat,response,login){
	//console.log("hey i'm the StudentAuthentificationCallback function")
	//console.log(resultat)
	if (resultat !== undefined & resultat.length !=0 ){
		typeUser=2;
		//req.session.type=2;
		//req.session.authetifcated=1;
		response.redirect('/getStudentHomePage/'+login);
		return;
	}
	// si je suis ici c'est que je suis ni adhérant ni admin
	messageALerte="Mot de passe ou non d'utilisateur non correcte"
	typeUser=0;
	//req.session.authetifcated=0;
	response.render('login.ejs', {message:messageALerte});
}
/**********************************************************************************************/
/******************************** Démarrage du seveur *****************************************/
/**********************************************************************************************/
app.listen(port, (err) => {
  if (err) {
    return //console.log('something bad happened', err)
  }
  //console.log(`server is listening on ${port}`)
})