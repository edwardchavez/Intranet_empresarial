var mysql = require('mysql');

var conexion =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mysql',
    database:'menu_empresa'
});

conexion.connect(function (error){
    if(error)
    console.log('Problemas de conexion con mysql');
    else
    console.log('se inicio conexion');
})

module.exports=conexion;
