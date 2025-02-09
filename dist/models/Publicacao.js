"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
const utils_1 = require("../utils/utils");
// Importa as funções de quebra para caixa
const utilsExibicoes_1 = require("../utils/utilsExibicoes");
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
    getExibicaoFormatada(exibicao = false) {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth = getTerminalWidth();
        const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);
        const header = "PUBLICAÇÃO";
        const dataFormatada = new Date(this._dataDePublicacao).toLocaleString("pt-BR");
        const info = `Autor: ${this._perfilDoAutor} | Data: ${dataFormatada}`;
        const wrappedHeader = (0, utilsExibicoes_1.wrapText)(header, fixedInnerWidth);
        const wrappedInfo = (0, utilsExibicoes_1.wrapText)(info, fixedInnerWidth);
        const wrappedContent = (0, utilsExibicoes_1.wrapContentToBox)(this._conteudo, fixedInnerWidth);
        const linhas = [
            ...wrappedHeader,
            ...wrappedInfo,
            "",
            ...wrappedContent
        ];
        const caixaLargura = fixedInnerWidth;
        const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
        let maisEspaco = exibicao ? 0 : 0;
        const leftPad = ' '.repeat(padLeft);
        const topo = ' '.repeat(padLeft + maisEspaco) + "╔" + "═".repeat(caixaLargura) + "╗";
        const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
        let box = topo + "\n";
        linhas.forEach(linha => {
            box += leftPad + "║" + linha.padEnd(caixaLargura, ' ') + "║\n";
        });
        box += fundo;
        return box;
    }
    /**
     * Exibe esta publicação em uma caixa estilizada com tamanho fixo baseado no terminal.
     */
    exibirPublicacao() {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth = getTerminalWidth();
        // Define o tamanho fixo da caixa: 80% do terminal, com mínimo de 40 colunas
        const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);
        const header = "PUBLICAÇÃO";
        const dataFormatada = new Date(this._dataDePublicacao).toLocaleString("pt-BR");
        const info = `Autor: ${this._perfilDoAutor} | Data: ${dataFormatada}`;
        // Quebra cada parte utilizando o tamanho fixo
        const wrappedHeader = (0, utilsExibicoes_1.wrapText)(header, fixedInnerWidth);
        const wrappedInfo = (0, utilsExibicoes_1.wrapText)(info, fixedInnerWidth);
        const wrappedContent = (0, utilsExibicoes_1.wrapContentToBox)(this._conteudo, fixedInnerWidth);
        // Junta as linhas da caixa
        const linhas = [
            ...wrappedHeader,
            ...wrappedInfo,
            "",
            ...wrappedContent
        ];
        const caixaLargura = fixedInnerWidth;
        const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
        const leftPad = ' '.repeat(padLeft);
        const topo = leftPad + "╔" + "═".repeat(caixaLargura) + "╗";
        const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
        console.log(topo);
        linhas.forEach(linha => {
            const padded = linha.padEnd(caixaLargura, ' ');
            console.log(leftPad + "║" + padded + "║");
        });
        console.log(fundo);
    }
}
exports.Publicacao = Publicacao;
