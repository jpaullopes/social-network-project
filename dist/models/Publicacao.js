"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
class Publicacao {
    // construtor para inicializar os atributos
    constructor(id, conteudo, perfilDoAutor, dataDePublicacao = new Date()) {
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
}
exports.Publicacao = Publicacao;
