var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var mysql = require('mysql');
const chalk = require('chalk');
const log = console.log;

//Colores 
const success = chalk.bold.green;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
    console.log('Escuchando el puerto: ' + port);
});

connectedCount = 0;
  


//Conexion a la base de datos de la App
var con = mysql.createConnection({host: "127.0.0.1", user: "root", password: "", database : 'proyectoemp'});

con.connect(function(err) {
    log(error('error connecting: ' + err));
}); 
 
io.on('connection', function(socket){
    // Cuenta los clientes conectados
    //log(io.engine.clientsCount);
    var ip = socket.client.conn.remoteAddress;
    var sql = "SELECT * FROM eusuariosxxx";
    con.query(sql, function (error, results, fields) {
      // console.log('El id es: ', results[0].id);
        io.emit('historic', results);
    });    
    log(success('Usuario conectado desde: ' + ip));
    
    
        

    
    
    deddd
    
    
    
    
    
    
    
    
    io.emit('user connected', connectedCount);
    io.on('chat message', function(msg){
        io.emit('chat message', msg);
        
        log(success('Mensaje enviado'));
        
        // console.log(socket.id);


        
        var sql = "INSERT INTO eusuariosxxx (nombre, apellido, email, role, tef, login)VALUES ('"+msg+"','Company Inc','Company Inc','Company Inc','Company Inc','Highway 37')";
        con.query(sql, function (error, results, fields) {
          // console.log('El id es: ', results[0].id);
          // console.log("1 record inserted, ID: " + results.insertId);
        });
        
        socket.on('disconnect', function() {
            // needs to be stopped explicitly or it will continue
            // listening to redis for updates.
            log(warning('Desconectado'));
            
            // var i = allClients.indexOf(socket);
            // allClients.splice(i, 1);
            
            connectedCount--;
            io.emit('user connected', connectedCount);
        });        
        // con.end();
    });
    
    socket.on('desconect', function() {
        log(warning('Desconectado prueba'));
        socket.disconnect(0);
    });  
});