"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
const utils_1 = require("../utils/utils");
class Publicacao {
    // construtor para inicializar os atributos
    constructor(conteudo, perfilDoAutor, tipo = 'ps', dataDePublicacao = new Date(), id = (0, utils_1.gerarId)()) {
        this._id = id; // sujeito a mudanças no jeito de setar o id
        this._conteudo = conteudo;
        this._dataDePublicacao = dataDePublicacao;
        this._perfilDoAutor = perfilDoAutor;
        this._tipo = tipo;
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
    get tipo() {
        return this._tipo;
    }
    set dataDePublicacao(dataDePublicacao) {
        this._dataDePublicacao = dataDePublicacao;
    }
    /**
     * Exibe esta publicação bem elaborada dentro de uma caixinha estilizada.
     */
    exibirPublicacao() {
        // Acesse a função getTerminalWidth (ajuste a importação conforme necessário)
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const header = "PUBLICAÇÃO";
        const info = `Autor: ${this._perfilDoAutor} | Data: ${this._dataDePublicacao.toLocaleString()}`;
        const conteudoLinhas = this._conteudo.split('\n');
        const linhas = [header, info, "", ...conteudoLinhas];
        // Calcula a largura máxima das linhas
        const larguraMax = Math.max(...linhas.map(l => l.length));
        const caixaLargura = larguraMax + 2; // espaços laterais internos
        const terminalWidth = getTerminalWidth();
        const padLeft = Math.floor((terminalWidth - (caixaLargura + 2)) / 2);
        const leftPad = ' '.repeat(padLeft);
        // Borda elaborada usando caracteres Unicode
        const topo = leftPad + "╔" + "═".repeat(caixaLargura) + "╗";
        const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
        console.log(topo);
        linhas.forEach(linha => {
            const padded = linha.padEnd(larguraMax, ' ');
            console.log(leftPad + "║ " + padded + " ║");
        });
        console.log(fundo);
    }
}
exports.Publicacao = Publicacao;
