"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirMensagemCaixa = exibirMensagemCaixa;
exports.wrapText = wrapText;
exports.wrapContentToBox = wrapContentToBox;
exports.exibirPerfilEmBox = exibirPerfilEmBox;
exports.exibirAmigosPerfil = exibirAmigosPerfil;
exports.exibirMenuCentralizado = exibirMenuCentralizado;
exports.getBoxVoltar = getBoxVoltar;
exports.getBoxForFriendRequest = getBoxForFriendRequest;
exports.opcaoVoltar = opcaoVoltar;
exports.exibirPerfilEPublicacoes = exibirPerfilEPublicacoes;
const utils_1 = require("./utils");
const utilsAuxiliaresMenu_1 = require("./utils-menu/utilsAuxiliaresMenu");
const inquirer_1 = __importDefault(require("inquirer"));
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
/**
 * Exibe os perfis recebidos em uma box estilizada.
 * Cada perfil será exibido em duas linhas: uma com ID, Nome e Email e outra com a Descrição.
 */
function exibirPerfilEmBox(perfil) {
    const terminalWidth = (0, utilsAuxiliaresMenu_1.getTerminalWidth)();
    const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);
    const header = "PERFIS";
    // Cria as linhas de conteúdo
    const linhas = [];
    linhas.push(header);
    linhas.push(""); // espaço entre cabeçalho e itens
    // Linha única com informações básicas
    linhas.push(`ID: ${perfil.id} | Nome: ${perfil.nome} | Email: ${perfil.email}`);
    // Linha para descrição
    linhas.push(`Descrição: ${perfil.descricao}`);
    linhas.push(""); // espaço entre perfis
    // Constrói a box
    const topo = "╔" + "═".repeat(fixedInnerWidth) + "╗";
    const fundo = "╚" + "═".repeat(fixedInnerWidth) + "╝";
    console.log(topo);
    linhas.forEach(linha => {
        console.log("║" + linha.padEnd(fixedInnerWidth, ' ') + "║");
    });
    console.log(fundo);
}
/**
 * Exibe os dados dos amigos do perfil em uma box estilizada.
 * A box apresenta: foto (emoji), nome, descrição, quantidade de amigos e publicações.
 * @param perfil - Instância de Perfil
 */
function exibirAmigosPerfil(perfil) {
    const terminalWidth = (0, utilsAuxiliaresMenu_1.getTerminalWidth)();
    const boxWidth = 50;
    const countAmigos = perfil.contarAmigos();
    const countPublicacoes = (typeof perfil.contarPublicacoes === 'function') ? perfil.contarPublicacoes() : 0;
    const linhas = [
        `Foto: ${perfil.foto || '👤'} Nome: ${perfil.nome}`,
        `Descrição: ${perfil.descricao}`,
        `Amigos: ${countAmigos} Publicações: ${countPublicacoes}`,
    ];
    const topo = "╔" + "═".repeat(boxWidth) + "╗";
    const fundo = "╚" + "═".repeat(boxWidth) + "╝";
    const padLeft = ' '.repeat(Math.floor((terminalWidth - (boxWidth + 2)) / 2));
    console.log(padLeft + topo);
    linhas.forEach(linha => {
        console.log(padLeft + "║" + linha.padEnd(boxWidth, ' ') + "║");
    });
    console.log(padLeft + fundo);
}
/**
 * Exibe as opções do menu em uma box centralizada.
 * @param opcoes - Array de opções, onde cada opção tem a propriedade 'name'.
 */
function exibirMenuCentralizado(opcoes) {
    const { getTerminalWidth } = require("./utils-menu/utilsAuxiliaresMenu");
    const terminalWidth = getTerminalWidth();
    // Encontra o comprimento máximo entre os nomes das opções
    const maxLen = Math.max(...opcoes.map(o => o.name.length));
    // Define a largura da caixa com base no maior comprimento e um padding fixo
    const boxWidth = maxLen + 4;
    const padLeft = Math.max(0, Math.floor((terminalWidth - (boxWidth + 2)) / 2));
    const leftPad = ' '.repeat(padLeft);
    const topo = leftPad + "╔" + "═".repeat(boxWidth) + "╗";
    const fundo = leftPad + "╚" + "═".repeat(boxWidth) + "╝";
    console.log(topo);
    opcoes.forEach(opcao => {
        console.log(leftPad + "║" + opcao.name.padEnd(boxWidth, ' ') + "║");
    });
    console.log(fundo);
}
function getBoxVoltar(checkbox = false) {
    const terminalWidth = (0, utilsAuxiliaresMenu_1.getTerminalWidth)();
    // Encontra o comprimento máximo entre os nomes das opções
    const text = "Voltar";
    const maxLen = Math.max(text.length);
    const boxWidth = maxLen + 4;
    const padLeft = Math.max(0, Math.floor((terminalWidth - (boxWidth + 2)) / 2));
    const leftPad = ' '.repeat(padLeft);
    const padding = Math.floor((boxWidth - 2 - text.length) / 2);
    const extra = (boxWidth - 2 - text.length) % 2;
    const line = leftPad + "║" + " ".repeat(padding) + text + " ".repeat(padding + extra) + "║";
    const top = ' '.repeat(padLeft - 2) + "╔" + "═".repeat(boxWidth - 2) + "╗";
    if (checkbox) {
        const top = ' '.repeat(padLeft - 4) + "╔" + "═".repeat(boxWidth - 2) + "╗";
    }
    const bottom = leftPad + "╚" + "═".repeat(boxWidth - 2) + "╝";
    return `${top}\n${line}\n${bottom}`;
}
function getBoxForFriendRequest(text) {
    const terminalWidth = (0, utilsAuxiliaresMenu_1.getTerminalWidth)();
    const boxWidth = 30;
    const padding = Math.floor((boxWidth - 2 - text.length) / 2);
    const extra = (boxWidth - 2 - text.length) % 2;
    const line = "║" + " ".repeat(padding) + text + " ".repeat(padding + extra) + "║";
    const top = "╔" + "═".repeat(boxWidth - 2) + "╗";
    const bottom = "╚" + "═".repeat(boxWidth - 2) + "╝";
    const leftPad = ' '.repeat(Math.floor((terminalWidth - boxWidth) / 2));
    return `${' '.repeat(Math.floor((terminalWidth - boxWidth) / 2) - 2)}${top}\n${leftPad}${line}\n${leftPad}${bottom}`;
}
// Retorna uma opção única "Voltar" formatada em caixa
function opcaoVoltar() {
    return { name: getBoxVoltar(), value: null };
}
// Exibe o perfil formatado e, em seguida, suas publicações
async function exibirPerfilEPublicacoes(perfil, app) {
    (0, utilsAuxiliaresMenu_1.displayHeader)("PERFIL");
    console.log(perfil.exibirPerfilFormatado(false));
    app.buscarPublicacoesPorPerfil(perfil).forEach(publicacao => {
        publicacao.exibirPublicacao();
    });
    const opcaoVoltarOption = opcaoVoltar();
    const response = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'opcao',
            message: '',
            choices: [opcaoVoltarOption],
        },
    ]);
    if (response.opcao === null) {
        return;
    }
}
