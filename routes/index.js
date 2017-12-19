var express = require('express');
var app = express.Router();

var db = require('../db/db');

//------------------------------------cargas el login-------------------------------//
/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
app.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

app.post('/login', function (req, res, next) {
  //var message = '';
  var sess = req.session;
  if (req.method == "POST") {
    var post = req.body;
    var name = post.user_name;
    var pass = post.password;

    var sql = "SELECT id,username, password, full_name FROM `tbl_users` WHERE `username`='" + name + "' and password = '" + pass + "'";
    db.query(sql, function (err, results) {
      if (results.length) {
        console.log(results[0].id);
        req.session.userId = results[0].id;
        req.session.user = results[0];
        console.log(results[0].id);
        res.redirect('/dashboard');
      }
      else {
        message = 'Wrong Credentials.';
        res.render('error.ejs', { message: message });
      }

    });
  } else {
    // message = 'Wrong Credentials.';
    res.render('error.ejs');//,{message: message});
  }

});



//-----------------------------------------------dashboard page functionality----------------------------------------------

app.get('/dashboard', function (req, res, next) {

  var user = req.session.user,
    userId = req.session.userId;
  console.log('ddd=' + userId);
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `tbl_users` WHERE `id`='" + userId + "'";

  db.query(sql, function (err, results) {
    console.log
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
    console.log(result);
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
      if (err){
        message = "Unsuccesfully! Your account hasn't been created.";
        res.render('Sussefull.ejs', { message: message });  
      
      }else{
        message = "Succesfully! Your account has been created.";
        res.render('Sussefull.ejs', { message: message });
        
      }
    });

  } else {
    res.render('signup');
  }
});

module.exports = app;
