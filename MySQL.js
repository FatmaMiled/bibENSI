var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bibensi",
});

con.connect(function(err) {
		  if (err) throw err;
		  console.log("Connected!");
		  });

module.exports = {

	isAdmin: function(login,password,callbackFunction,response){
		console.log("isAdmin?")
		//console.log(login)
		//console.log(password)
		var query="SELECT * FROM administrateurs where motDePasse='"+password+"' and nomutilisateur='"+login+"'"
		con.query(query, function (err, result, fields) {
		if (err) throw err;
		callbackFunction(result,login,password,response);
		});
			
	},
	isStudent: function(login,password,callbackFunction,response){
		console.log("isStudent?")
		//console.log(login)
		//console.log(password)
		query="SELECT * FROM adherants where motDePasse='"+password+"' and cin='"+login+"'";
		console.log(query)
		con.query(query, function (err, result, fields) {
		if (err) throw err;
		//console.log(result);
		//console.log(result.length)
		callbackFunction(result,response,login);
		});
	},
	getStudentInfos:function(cin,request,response,getStudentHomePageCallback){
		console.log("getStudentInfos");
		var studentInfos,studentBooks;
		query="SELECT * FROM adherants where  cin='"+cin+"'";
		console.log(query)
		con.query(query, function (err, result1, fields) {
		if (err) throw err;
		//console.log(result1);
		studentInfos=result1

			console.log("getStudentBooks");
			query2="SELECT * FROM emprunts as em,livres as e where  cin='"+cin+"' and em.idLivre = e.idLivre and em.dateEmprunt=em.dateRetourEffective";
			console.log(query2)
			con.query(query2, function (err, result2, fields) {
			if (err) throw err;
			//console.log(result2);
			studentBooks=result2
			getStudentHomePageCallback(request,response,studentInfos,studentBooks)
			});
		});
	},
	getStudentTables: function(cin,request,response,getStudentTablesCallback){
		console.log("getStudentTables?")
		var studentInfos,studentBooks;
		query="SELECT * FROM emprunts as em,livres as e where  cin='"+cin+"' and em.idLivre = e.idLivre and em.dateEmprunt!=em.dateRetourEffective";
		console.log(query)
		con.query(query, function (err, result1, fields) {
		if (err) throw err;
		books=result1
		getStudentTablesCallback(cin,request,response,books,cin)
		});
	},
	getStudentNotifications: function(cin,request,response,callbackFunction){
		console.log("getStudentNotifications?")
		var studentInfos,studentBooks;
		query="SELECT * FROM actualite  order by date desc limit 5";
		//console.log(query)
		con.query(query, function (err, result1, fields) {
		if (err) throw err;
		notifications=result1
		//console.log(notifications)
			console.log("getStudentBooks");
			date = new Date();
			//console.log(date.toString())
			query2="SELECT * FROM emprunts as em,livres as e where  cin='"+cin+"' and em.idLivre = e.idLivre and em.dateRetourTheorique < '"+date.toString()+"' and em.dateEmprunt=em.dateRetourEffective";
			//console.log(query2)
			con.query(query2, function (err, result2, fields) {
			if (err) throw err;
			//console.log(result2);
			  becareful=result2
			  console.log(becareful)
			 				dt = new Date();	
			  				dt.setHours( dt.getHours() + 48 );
			  				console.log("------------------------------------")
			  				console.log(dt.toString())
							query3="SELECT * FROM emprunts as em,livres as e where  cin='"+cin+"' and em.idLivre = e.idLivre and em.dateEmprunt=em.dateRetourEffective";
							console.log(query3)
							con.query(query3, function (err, result3, fields) {
							if (err) throw err;
							console.log(result3);
							warnings=[]
							var i
							for(i=0;i<result3.length;i++){
								if(result3[i].dateRetourEffective < dt.toString() && result3[i].dateRetourEffective>date.toString())
									warnings.append(result3[i])
								console.log(i)
							}
							 
							 //console.log(warnings)
							 console.log("ok ok")

						     callbackFunction(cin,request,response,notifications,becareful,warnings)
							});
			});
		});
	},
	getDashboardInfos: function(request,response,callbackFunction){
		//console.log("getDashboardInfos?")
		var studentInfos,studentBooks;
		query="SELECT count(*) as n FROM adherants";
		//console.log(query)
		con.query(query, function (err, result1, fields) {
		if (err) throw err;
		nbEtudiant=result1
		//console.log(notifications)
			//console.log("getStudentBooks");
			query2="SELECT count(*)  as n FROM livres where nbExemplairesDisponibles > 0";
			//console.log(query2)
			con.query(query2, function (err, result2, fields) {
			if (err) throw err;
			//console.log(result2);
			  nbBooks=result2
			  				console.log("------------------------------------")
							query3="SELECT * FROM emprunts as em,livres as e,adherants as ad where  em.idLivre = e.idLivre and em.cin=ad.cin and em.dateEmprunt=em.dateRetourEffective order by em.dateEmprunt desc limit 7";
							//console.log(query3)
							con.query(query3, function (err, result3, fields) {
							if (err) throw err;
							console.log(result3);
						    callbackFunction(request,response,nbEtudiant,nbBooks,result3)
							});
			});
		});
	},
	getAllBooks: function(request,response,callbackFunction){
		console.log("--------------------------------------------------")
		console.log("getAllBooks")
		var books;
		query="SELECT * FROM livres";
		console.log(query)
		con.query(query, function (err, result, fields) {
		if (err) throw err;
		books=result
		callbackFunction(request,response,books)
		});
	},
	getAbonnesPage: function(request,response,callbackFunction){
		console.log("--------------------------------------------------")
		console.log("getAbonnesPage")
		var books;
		query="SELECT * FROM adherants";
		console.log(query)
		con.query(query, function (err, result, fields) {
		if (err) throw err;
		abonnes=result
		callbackFunction(request,response,abonnes)
		});
	},
	getAdminNotifications: function(request,response,callbackFunction){
		console.log("--------------------------------------------------")
		console.log("getAdminNotifications")
		var books;
		query="SELECT * FROM actualite order by date desc limit 7";
		console.log(query)
		con.query(query, function (err, result, fields) {
		if (err) throw err;
		actualite=result
		callbackFunction(request,response,actualite)
		});
	},
	getEmprunterInfos: function(request,response,callbackFunction,msg){
		//console.log("getStudentTables?")
		var students=[],books=[];
		query1="SELECT * FROM adherants";
		console.log(query1)
		con.query(query1, function (err, result1, fields) {
		if (err) throw err;
		students=result1
			query2="SELECT * FROM livres where nbExemplairesDisponibles>0";
			console.log(query2)
			con.query(query2, function (err, result2, fields) {
			if (err) throw err;
			books=result2
			callbackFunction(request,response,students,books,msg)
			});
		});
	},
	getRetourInfos: function(request,response,callbackFunction,msg){
		//console.log("getStudentTables?")
		var students=[],books=[];
		query1="SELECT * FROM adherants";
		console.log(query1)
		con.query(query1, function (err, result1, fields) {
		if (err) throw err;
		students=result1
			query2="SELECT * FROM livres where nbExemplairesDisponibles>0";
			console.log(query2)
			con.query(query2, function (err, result2, fields) {
			if (err) throw err;
			books=result2
			callbackFunction(request,response,students,books,msg)
			});
		});
	},
	insertEmprunt(response,cin,idLivre,date){
		console.log("--------------------------------------------------")
		console.log("insertEmprunt")
		var books;
		var dt =  new Date().toJSON().slice(0,10).replace(/-/g,'-');
		query="INSERT INTO `emprunts`(`idLivre`, `cin`, `dateRetourEffective`, `dateRetourTheorique`, `dateEmprunt`) \
		VALUES ("+idLivre+","+cin+",'"+date+"','"+date+"','"+dt+"')";
		console.log(query)
		con.query(query, function (err, result, fields) {
		if (err) throw err;
		console.log(result)
				query0="select  nbExemplairesDisponibles from livres where idLivre="+idLivre
				con.query(query0, function (err, result2, fields) {
				if (err) throw err;
				nb=result2[0].nbExemplairesDisponibles
				console.log(nb)
				nb=nb-1
					query1="UPDATE `livres` SET  `nbExemplairesDisponibles`="+nb+" WHERE idLivre="+idLivre+";"
					console.log(query1)
					con.query(query1, function (err, result1, fields) {
					if (err) throw err;
					response.redirect("/getEmprunterPage/ok")

					});
				});

		});
	},
	insertRetour(response,cin,idLivre){
		console.log("--------------------------------------------------")
		console.log("insertEmprunt")
		var books;
		var dt =  new Date().toJSON().slice(0,10).replace(/-/g,'-');
		query="UPDATE `emprunts` SET `dateRetourEffective`='"+dt+"' where idLivre='"+idLivre+"' and cin='"+cin+"'";
		console.log(query)
		con.query(query, function (err, result, fields) {
		if (err) throw err;
		console.log(result)
				query0="select  nbExemplairesDisponibles from livres where idLivre="+idLivre
				con.query(query0, function (err, result2, fields) {
				if (err) throw err;
				nb=result2[0].nbExemplairesDisponibles
				console.log(nb)
				nb=nb+1
					query1="UPDATE `livres` SET  `nbExemplairesDisponibles`="+nb+" WHERE idLivre="+idLivre+";"
					console.log(query1)
					con.query(query1, function (err, result1, fields) {
					if (err) throw err;
					response.redirect("/getRetourPage/ok")

					});
				});

		});
	}

}