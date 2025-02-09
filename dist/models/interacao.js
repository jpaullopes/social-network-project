"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interacao = void 0;
const utils_1 = require("../utils/utils");
class Interacao {
    constructor(tipo, idPublicacao, autorPublicacao, id) {
        this._id = id ? id : (0, utils_1.gerarId)();
        this._tipo = tipo;
        this._idPublicacao = idPublicacao;
        this._autorPublicacao = autorPublicacao;
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
    get autorPublicacao() {
        return this._autorPublicacao;
    }
    set idPublicacao(idPublicacao) {
        this._idPublicacao = idPublicacao;
    }
    set autorPublicacao(autorPublicacao) {
        this._autorPublicacao = autorPublicacao;
    }
    //exibir interacao
    exibirInteracao() {
        const idLabel = "ID:".padEnd(20);
        const tipoLabel = "Tipo:".padEnd(20);
        const perfilAutorLabel = "Perfil do autor:".padEnd(20);
        console.log(`${idLabel} ${this._id} | ${tipoLabel} ${this._tipo} | ${perfilAutorLabel} ${this._idPublicacao}`);
    }
    // Exibe a interação em uma caixa formatada
    exibirInteracaoFormatada() {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth = getTerminalWidth();
        const boxWidth = 50; // largura fixa para o box
        const header = "INTERAÇÃO";
        const topBorder = "╔" + "═".repeat(boxWidth) + "╗";
        const bottomBorder = "╚" + "═".repeat(boxWidth) + "╝";
        const content = [
            `ID: ${this._id} Autor: ${this._autorPublicacao}`,
            `Publicação: ${this._idPublicacao} Tipo: ${this._tipo}`,
        ];
        const padLeft = ' '.repeat(Math.floor((terminalWidth - (boxWidth + 2)) / 2));
        console.log(padLeft + topBorder);
        console.log(padLeft + "║" + header.padStart((boxWidth + header.length) / 2, " ").padEnd(boxWidth, " ") + "║");
        console.log(padLeft + "╟" + "─".repeat(boxWidth) + "╢");
        content.forEach(line => {
            const extraRight = line.startsWith("Publicação") ? "" : "";
            console.log(padLeft + "║" + line.padEnd(boxWidth, " ") + extraRight + "║");
        });
        console.log(padLeft + bottomBorder);
    }
}
exports.Interacao = Interacao;
