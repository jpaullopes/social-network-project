"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Perfil_1 = require("../models/Perfil");
const utilsPerfilJson_1 = require("../utils/utilsPerfilJson");
const alvare = new Perfil_1.Perfil('alvaro', 'pinto@gmail.com', '123456798998');
if ((0, utilsPerfilJson_1.validarInformacoesUsuario)(alvare)) {
    (0, utilsPerfilJson_1.adicionarPerfilNoJson)(alvare);
    console.log("Perfil adicionado com sucesso!");
}
else {
    console.log("Perfil já cadastrado!");
}
