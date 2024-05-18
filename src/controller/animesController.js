/*1°) Importações*/ 
const express = require('express'); 
const router = express.Router(); 
const mongoose = require("mongoose"); 
//vamos carregar nosso modelo  
require("../models/animes"); 
const Animes = mongoose.model("animes"); 
 
/*_____________ Rotas das animes __________________ */ 
 
/*2°) Abre e carrega todas informações de animes no formulário 
animes.handlebars */ 
router.get('/animes', (req, res) => { 
    Animes.find().lean().then((animes) => { 
        res.render("admin/animes/animes", { animes: animes }); 
    }); 
}); 
 
/*3°) Abre o Formulário addanimes.handlebars */ 
router.get('/animes/add', (req, res) => { 
    res.render("admin/animes/addanimes"); 
}); 
 
/*4°) Recebe as informações do botão que está no addanimes.handlebar 
e efetua o cadastro no banco de dados, depois ele volta para a listagem 
das animes */ 
router.post('/animes/nova', (req, res) => { 
    var animes = new Animes(); 
    animes.nome=req.body.nome; 
    animes.genero=req.body.genero; 
    animes.save().then(() => { 
        res.redirect("/rota_animes/animes"); 
    }).catch((erro) => { 
        res.send('Houve um erro: ' + erro); 
    }); 
}); 
 
/*5°) Abre e preenche o formulário editanimes.handlebars com informações 
do id passado */ 
router.get('/editar_animes/:id', (req, res) => { 
    Animes.findOne({_id:req.params.id}).lean().then((animes) => { 
        res.render("admin/animes/editanimes", { anime: animes }); 
    }); 
}); 
 
/*6°) Recebe as informações do botão que está no edittarefa.handlebar 
e efetua a alteração no banco de dados. Volta para listagem das animes*/ 
router.post('/animes/editar_animes', (req, res) => { 
Animes.updateOne({_id:req.body._id}, 
{$set:{nome:req.body.nome, genero:req.body.genero 
}}).then(() => { 
res.redirect("/rota_animes/animes"); 
}); 
});    
/*7°) No form turma.handlebars que lista as turmas possui um botão para 
deletar 
Ele deleta informação e refaz a lista no turma.handlebars*/ 
router.get('/deletar_animes/:id', (req, res) => { 
Animes.deleteMany({_id:req.params.id}).then(() => { 
res.redirect("/rota_animes/animes"); 
}); 
}); 
/*______ Fim das rotas das animes ___________ */ 
module.exports = router; 
