/*1°) Importações*/ 
const express = require('express'); 
const router = express.Router(); 
const mongoose = require("mongoose"); 
//vamos carregar nosso modelo  
require("../models/personagens"); 
const Personagens = mongoose.model("personagens"); 
 
/*_____________ Rotas das personagens __________________ */ 
 
/*2°) Abre e carrega todas informações de personagens no formulário 
personagens.handlebars */ 
router.get('/personagens', (req, res) => { 
    Personagens.find().lean().then((personagens) => { 
        res.render("admin/personagens/personagens", { personagens: personagens}); 
    }); 
}); 
 
/*3°) Abre o Formulário addpersonagens.handlebars */ 
router.get('/personagens/add', (req, res) => { 
    res.render("admin/personagens/addpersonagens"); 
}); 
 
/*4°) Recebe as informações do botão que está no addpersonagens.handlebar 
e efetua o cadastro no banco de dados, depois ele volta para a listagem 
das personagens */ 
router.post('/personagens/nova', (req, res) => { 
    var personagens = new Personagens(); 
    personagens.nome=req.body.nome; 
    personagens.funcao=req.body.funcao; 
    personagens.save().then(() => { 
        res.redirect("/rota_personagens/personagens"); 
    }).catch((erro) => { 
        res.send('Houve um erro: ' + erro); 
    }); 
}); 
 
/*5°) Abre e preenche o formulário editpersonagens.handlebars com informações 
do id passado */ 
router.get('/editar_personagens/:id', (req, res) => { 
    Personagens.findOne({_id:req.params.id}).lean().then((personagens) => { 
        res.render("admin/personagens/editpersonagens", { personagem: personagens }); 
    }); 
}); 
 
/*6°) Recebe as informações do botão que está no editpersonagem.handlebar 
e efetua a alteração no banco de dados. Volta para listagem das personagens*/ 
router.post('/personagens/editar_personagens', (req, res) => { 
Personagens.updateOne({_id:req.body._id}, 
{$set:{nome:req.body.nome, funcao:req.body.funcao 
}}).then(() => { 
res.redirect("/rota_personagens/personagens"); 
}); 
});    
/*7°) No form turma.handlebars que lista as turmas possui um botão para 
deletar 
Ele deleta informação e refaz a lista no turma.handlebars*/ 
router.get('/deletar_personagens/:id', (req, res) => { 
Personagens.deleteMany({_id:req.params.id}).then(() => { 
res.redirect("/rota_personagens/personagens"); 
}); 
}); 
/*______ Fim das rotas das personagens ___________ */ 
module.exports = router; 
