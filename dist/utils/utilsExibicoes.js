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
    const wrapped = [];
    const words = text.split(' ');
    let current = '';
    for (const word of words) {
        if (word.length > maxWidth) {
            // Se houver um valor acumulado, empurra-o antes de quebrar a palavra
            if (current) {
                wrapped.push(current);
                current = '';
            }
            // Quebra a palavra longa em pedaços
            for (let i = 0; i < word.length; i += maxWidth) {
                wrapped.push(word.substring(i, i + maxWidth));
            }
            continue;
        }
        if (current.length + word.length + (current ? 1 : 0) <= maxWidth) {
            current += (current ? ' ' : '') + word;
        }
        else {
            wrapped.push(current);
            current = word;
        }
    }
    if (current)
        wrapped.push(current);
    return wrapped;
}
/**
 * Quebra o conteúdo em linhas considerando o tamanho máximo da box.
 * Para cada linha, utiliza wrapText para garantir que não ultrapasse o boxWidth.
 * @param content - Conteúdo a ser quebrado.
 * @param boxWidth - Largura máxima permitida para cada linha.
 * @returns {string[]} Array de linhas ajustadas.
 */
function wrapContentToBox(content, boxWidth) {
    const originalLines = content.split('\n');
    let wrappedLines = [];
    originalLines.forEach(line => {
        if (line.length > boxWidth) {
            wrappedLines.push(...wrapText(line, boxWidth));
        }
        else {
            wrappedLines.push(line);
        }
    });
    return wrappedLines;
}
