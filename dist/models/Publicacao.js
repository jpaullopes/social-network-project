"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
const utils_1 = require("../utils/utils");
class Publicacao {
    // construtor para inicializar os atributos
    constructor(conteudo, perfilDoAutor, dataDePublicacao = new Date(), id = (0, utils_1.gerarId)()) {
        this._id = id; // sujeito a mudanças no jeito de setar o id
        this._conteudo = conteudo;
        this._dataDePublicacao = dataDePublicacao;
        this._perfilDoAutor = perfilDoAutor;
    }
    // getters e setters
    get id() {
        return this._id;
    }
    get conteudo() {
        return this._conteudo;
    }
    get dataDePublicacao() {
        return this._dataDePublicacao;
    }
    get perfilDoAutor() {
        return this._perfilDoAutor;
    }
    set dataDePublicacao(dataDePublicacao) {
        this._dataDePublicacao = dataDePublicacao;
    }
    //função que exibe a publicação
    exibirPublicacao() {
        console.log(`ID: ${this._id}`);
        console.log(`Conteúdo: ${this._conteudo}`);
        console.log(`Data de publicação: ${this._dataDePublicacao}`);
        console.log(`Perfil do autor: ${this._perfilDoAutor}`);
    }
}
exports.Publicacao = Publicacao;
