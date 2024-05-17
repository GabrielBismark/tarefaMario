const express = require("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const rota_animes = require('./controller/animesController');
const rota_personagens = require('./controller/personagensController')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//Remanejando Rotas de animes 
app.use('/rota_animes', rota_animes);
const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor Rodando");
});
