var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var mysql = require('mysql');


app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
    console.log('Escuchando el puerto: ' + port);
});

connectedCount = 0;
io.on('connection', function(socket){
    console.log('Usuario conectado');
    connectedCount++;   //Cuento el usuario que se conecto
    io.emit('user connected', connectedCount);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('Mensaje enviado');
        
        // console.log(socket.id);
        var con = mysql.createConnection({host: "localhost", user: "root", password: "", database : 'proyectoemp'});

        con.connect(function(err) {
            if (err) throw err;
            // console.log("Connected!");
        });        
        
        
        var sql = "INSERT INTO eusuariosxxx (nombre, apellido, email, role, tef, login)VALUES ('"+msg+"','Company Inc','Company Inc','Company Inc','Company Inc','Highway 37')";
        con.query(sql, function (error, results, fields) {
          if (error) throw error;
          // console.log('El id es: ', results[0].id);
          // console.log("1 record inserted, ID: " + results.insertId);
        });
        
        con.end();
        socket.on('disconnect', function() {
            // needs to be stopped explicitly or it will continue
            // listening to redis for updates.
            console.log('Desconectado');
            connectedCount--;
            io.emit('user connected', connectedCount);
        });        
        
    });
});

