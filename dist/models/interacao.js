"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interacao = void 0;
const utils_1 = require("../utils/utils");
class Interacao {
    constructor(tipo, idPublicacao, id) {
        this._id = id ? id : (0, utils_1.gerarId)();
        this._tipo = tipo;
        this._idPublicacao = idPublicacao;
    }
    //getters e setters
    get id() {
        return this._id;
    }
    get tipo() {
        return this._tipo;
    }
    get idPublicacao() {
        return this._idPublicacao;
    }
    set idPublicacao(idPublicacao) {
        this._idPublicacao = idPublicacao;
    }
    //exibir interacao
    exibirInteracao() {
        const idLabel = "ID:".padEnd(20);
        const tipoLabel = "Tipo:".padEnd(20);
        const perfilAutorLabel = "Perfil do autor:".padEnd(20);
        console.log(`${idLabel} ${this._id} | ${tipoLabel} ${this._tipo} | ${perfilAutorLabel} ${this._idPublicacao}`);
    }
}
exports.Interacao = Interacao;
