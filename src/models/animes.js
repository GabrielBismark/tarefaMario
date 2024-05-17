require('./db');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Animes = new Schema({
    nome: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    }
});
mongoose.model("animes", Animes);
