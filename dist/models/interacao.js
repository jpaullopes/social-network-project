"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interacao = void 0;
const utils_1 = require("../utils/utils");
class Interacao {
    constructor(tipo, perfilAutor, id = '') {
        this._id = id ? id : (0, utils_1.gerarId)();
        this._tipo = tipo;
        this._perfilAutor = perfilAutor;
    }
    //getters e setters
    get id() {
        return this._id;
    }
    get tipo() {
        return this._tipo;
    }
    get perfilAutor() {
        return this._perfilAutor;
    }
    set perfilAutor(perfilAutor) {
        this._perfilAutor = perfilAutor;
    }
    //exibir interacao
    exibirInteracao() {
        const idLabel = "ID:".padEnd(20);
        const tipoLabel = "Tipo:".padEnd(20);
        const perfilAutorLabel = "Perfil do autor:".padEnd(20);
        console.log(`${idLabel} ${this._id} | ${tipoLabel} ${this._tipo} | ${perfilAutorLabel} ${this._perfilAutor}`);
    }
}
exports.Interacao = Interacao;
