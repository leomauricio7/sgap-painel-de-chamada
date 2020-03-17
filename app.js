//importando as bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const morgan = require('morgan');
const load = require('express-load');
const mongoose = require('mongoose');
const cors = require('cors')
const serverPort = process.env.PORT || 8001;
//passando para a constante app a função do express
const app = express();
const http = require('http').createServer(app);
//scoket.io
const io = require('socket.io')(http, { origins: '*:*'});

io.origins(['http://sigap.site']);

io.on('connection', function(socket) {
    console.log('a user connected:'+socket.id);
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
app.use((req, res, next) => {
    req.io = io;
    return next();
});
// aplly cors validate
app.use(cors());
app.use(morgan('dev'));
// aply put and delete to express
app.use(methodOverride('X-HTTP-Method-Override'));
// public directory
app.use(express.static(path.join(__dirname, '/www')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '10mb', extended: 'true' }));
// parse application/json
app.use(bodyParser.json({ limit: '20mb' }));
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Fix the CROSS problems
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// // Conectando com o banco de dados.
// const url = 'mongodb://sigap:123mudar@ds035488.mlab.com:35488/sigap';
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// };
// const mongoPromise = mongoose.connect(url, options);
// mongoPromise.then(() => {
//     console.log('Conectado ao MongoDB');
// });
// mongoPromise.catch(err => console.error(err));
// Carregando todos os controllers.
load('controllers').into(app);
// Porta e IP para iniciar servidor.
http.listen(serverPort, () => {
    console.log(`Painel rodando na porta: ${serverPort}`);
});