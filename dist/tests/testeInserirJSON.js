"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Perfil_1 = require("../models/Perfil");
const utilsPerfilJson_1 = require("../utils/utilsPerfilJson");
const iglesio = new Perfil_1.Perfil('Igrejas', 'pintooooooooo@gmail.com', 'amoothalysson', ";-;");
if ((0, utilsPerfilJson_1.validarInformacoesUsuario)("Igrejas", "pintoooooo@gmail.com")) {
    (0, utilsPerfilJson_1.adicionarPerfilNoJson)(iglesio);
}
