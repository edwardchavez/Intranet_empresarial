
var express = require('express');
var app = express.Router();
var XLSX = require('xlsx');

var db = require('../db/db');

//------------------------------------cargas el login-------------------------------//
/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

/* GET login page. */
app.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

app.post('/login', function (req, res, next) {
  //var message = '';
  var sess = req.session.user;//.username;
  //console.log(sess);
  if (req.method == "POST") {
    var post = req.body;
    var name = post.user_name;
    var pass = post.password;

    var sql = "SELECT id,username, password, full_name FROM `tbl_users` WHERE `username`='" + name + "' and password = '" + pass + "'";
    db.query(sql, function (err, results) {
      if (results.length) {
        // console.log(results[0].id);
        req.session.userId = results[0].id;
        req.session.user = results[0];
        // console.log(results[0]);
        res.redirect('/dashboard');
      }
      else {
        var message = 'Debe verificar su Usuario o el Password.';
        res.render('login', { info: message });
      }

    });
  } else {
    var message = 'Error en el requermiento POST.';
    res.render('login', { info: message });

  }

});



//-----------------------------------------------dashboard page functionality----------------------------------------------

app.get('/dashboard', function (req, res, next) {

  //var user = req.session.user,
  var userId = req.session.userId;
  // console.log('ddd=' + userId);
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `tbl_users` WHERE `id`='" + userId + "'";
  var user = req.session.user.username;
  //console.log(req.session.user.username);
  db.query(sql, function (err, results) {

    res.render('dashboard.ejs', { user: user });
  });
});


//------------------------------------logout functionality----------------------------------------------
app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/login");
  })
});



//--------------------------------render user details after login--------------------------------
app.get('/profile', function (req, res) {

  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `tbl_users` WHERE `id`='" + userId + "'";
  db.query(sql, function (err, result) {
    //console.log(result);
    res.render('profile.ejs', { data: result });
  });
});



//------------------------------------------------------signup---------------------------------------------------//
app.get('/signup', function (req, res, next) {
  res.render('signup');
});


app.post('/signup', function (req, res) {
  //message = '';
  if (req.method == "POST") {
    var post = req.body;
    var uname = post.username;
    var pass = post.password;
    var fname = post.full_name;
    var depto = post.departamento;
    var codigo = post.codigo;

    var sql = "INSERT INTO `tbl_users`(`full_name`,`departamento`,`codigo`,`username`, `password`) VALUES ('" + fname + "','" + depto + "','" + codigo + "','" + uname + "','" + pass + "')";

    var query = db.query(sql, function (err, results) {
      if (err) {
        message = "Unsuccesfully! Your account hasn't been created.";
        res.render('Sussefull.ejs', { message: message });

      } else {
        message = "Succesfully! Your account has been created.";
        res.render('Sussefull.ejs', { message: message });

      }
    });

  } else {
    res.render('signup');
  }
});


//---------------------------------edit users details after login----------------------------------

app.get('/editprofile', function (req, res, next) {
  res.render('signup');
});


app.post('/editprofile', function (req, res) {
  var userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `tbl_users` WHERE `id`='" + userId + "'";
  db.query(sql, function (err, results) {
    res.render('edit_profile.ejs', { data: results });
  });
});


//-----------------------------------------Reserva salon-------------------------------------------//

app.get('/reservasalon', function (req, res) {
    res.render("salon");
})
/*

app.get('/init', function(req, res){
	db.event.insert({ 
		text:"My test event A", 
		start_date: new Date(2013,8,1),
		end_date:	new Date(2013,8,5)
	});
	db.event.insert({ 
		text:"My test event B", 
		start_date: new Date(2013,8,19),
		end_date:	new Date(2013,8,24)
	});
	db.event.insert({ 
		text:"Morning event", 
		start_date: new Date(2013,8,4,4,0),
		end_date:	new Date(2013,8,4,14,0)
	});
	db.event.insert({ 
		text:"One more test event", 
		start_date: new Date(2013,8,3),
		end_date:	new Date(2013,8,8),
		color: "#DD8616"
	});

	res.send("Test events were added to the database")
});
*/

app.get('/data', function (req, res) {
  var sql = "SELECT text, start_date, end_date FROM `reser_salon`";// WHERE `id`='"+userId+"'";
  db.query(sql, function (err, results) {
    for (var i = 0; i < results.length; i++)
    console.log(res) ; 
    results[i].id = results[i]._id;
      console.log("auquio");
    //output response
    res.send(results);
  });
});



app.post('/data', function (req, res) {
  var data = req.body;
  /*var mode = data["!nativeeditor_status"];
  var sid = data.id;
  var tid = sid;*/
  var text = data.text;
  var desde = data.start_date;
  var hasta = data.end_date;
  var id_trans = data.id;

  /*delete data.id;
  delete data.gr_id;
  delete data["!nativeeditor_status"];*/
  var sql = "INSERT INTO `reser_salon`(`text`,`start_date`,`end_date`,`id_trans`) VALUES ('" + text + "','" + desde + "','" + hasta + "','" + id_trans + "')";

  db.query(sql, function (err, results) {
    if (err) {
     console.log("error encontrando '" + err + "'");
     
     /* message = "Unsuccesfully! Your account hasn't been created.";
      res.render('Sussefull.ejs', { message: message });*/

    } else {
      /*message = "Succesfully! Your account has been created.";
      res.render('Sussefull.ejs', { message: message });*/
      console.log("informacion guardada correctamente");

    }
  });

/*
  function update_response(err, result) {
    if (err)
      mode = "error";
    else if (mode == "inserted")
      tid = data._id;

    res.setHeader("Content-Type", "text/xml");
    res.send("<data><action type='" + mode + "' sid='" + sid + "' tid='" + tid + "'/></data>");
  }

  if (mode == "updated")
    db.event.updateById(sid, data, update_response);
  else if (mode == "inserted")
    db.event.insert(data, update_response);
  else if (mode == "deleted")
    db.event.removeById(sid, update_response);
  else
    res.send("Not supported operation");*/
});


module.exports = app;
