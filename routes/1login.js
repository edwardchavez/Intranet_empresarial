var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/login', function(req, res, next) {
res.render('login', { /*title: 'Express'*/ });
});


router.post('/login', function(req, res){
    var message = '';
    var sess = req.session; 
 
    if(req.method == "POST"){
       var post  = req.body;
       var name= post.user_name;
       var pass= post.password;
      
       var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/home/dashboard');
          }
          else{
             message = 'Wrong Credentials.';
             res.render('index.ejs',{message: message});
          }
                  
       });
    } else {
       res.render('index.ejs',{message: message});
    }
            
 });

 module.exports = router;





















