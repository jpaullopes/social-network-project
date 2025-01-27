"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Perfil_1 = require("./Perfil");
const PerfilAvancado_1 = require("./PerfilAvancado");
const perfil1 = new Perfil_1.Perfil('João', 'joao@gmail.com');
const perfil2 = new PerfilAvancado_1.PerfilAvancado('Maria', 'maria@gmail.com');
const perfil3 = new PerfilAvancado_1.PerfilAvancado('Carlos', 'carlos@gmail.com');
// console.log(perfil3.status)
// perfil2.desabilitarPerfil(perfil3)
// console.log(perfil3.status)
console.log(perfil1.status);
perfil2.desabilitarPerfil(perfil1);
console.log(perfil1.status);
console.log(perfil1.id);
