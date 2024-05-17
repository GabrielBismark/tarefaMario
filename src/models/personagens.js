require('./db');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Personagens = new Schema({
    nome: {
        type: String,
        required: true
    },
    funcao: {
        type: String,
        required: true
    }
});
mongoose.model("personagens", Personagens);
