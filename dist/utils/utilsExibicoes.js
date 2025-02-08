"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirMensagemCaixa = exibirMensagemCaixa;
exports.wrapText = wrapText;
exports.wrapContentToBox = wrapContentToBox;
const utils_1 = require("./utils");
const utilsAuxiliaresMenu_1 = require("./utils-menu/utilsAuxiliaresMenu");
/**
 * Exibe uma mensagem dentro de uma caixinha desenhada com caracteres Unicode.
 * @param mensagem - A mensagem a ser exibida.
 */
function exibirMensagemCaixa(mensagem) {
    (0, utils_1.clearConsole)();
    const terminalWidth = (0, utilsAuxiliaresMenu_1.getTerminalWidth)();
    const linhas = mensagem.split('\n');
    const larguraMax = Math.max(...linhas.map(l => l.length));
    const caixaLargura = larguraMax + 4; // bordas e espaços
    const padLeft = Math.floor((terminalWidth - caixaLargura) / 2);
    const leftPad = ' '.repeat(padLeft);
    const topo = leftPad + '┌' + '─'.repeat(larguraMax + 2) + '┐';
    const fundo = leftPad + '└' + '─'.repeat(larguraMax + 2) + '┘';
    console.log(topo);
    linhas.forEach(linha => {
        const conteudo = ' ' + linha.padEnd(larguraMax, ' ') + ' ';
        console.log(leftPad + '│' + conteudo + '│');
    });
    console.log(fundo);
}
/**
 * Quebra o texto em linhas com base na largura máxima especificada.
 * Trata palavras muito grandes dividindo-as em partes.
 * @param text - Texto a ser quebrado.
 * @param maxWidth - Largura máxima permitida em cada linha.
 * @returns {string[]} Array de linhas quebradas.
 */
function wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxWidth) {
            currentLine += (currentLine ? ' ' : '') + word;
        }
        else {
            lines.push(currentLine);
            currentLine = word;
        }
    });
    if (currentLine)
        lines.push(currentLine);
    return lines;
}
/**
 * Embaralha o conteúdo para exibição na box.
 * Neste exemplo, utiliza a mesma lógica de wrapText.
 */
function wrapContentToBox(text, maxWidth) {
    return wrapText(text, maxWidth);
}
