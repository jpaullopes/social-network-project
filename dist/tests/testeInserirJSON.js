"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Perfil_1 = require("../models/Perfil");
const PerfilAvancado_1 = require("../models/PerfilAvancado");
const jao = new Perfil_1.Perfil('alvaro', 'pinto@gmail.com', '123456798998', "O-O");
const tha = new PerfilAvancado_1.PerfilAvancado('al', 'to@gmail.com', '12345698', ";-;");
console.log(tha.status);
tha.desabilitarPerfil(tha);
console.log(tha.status);
