"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalk = void 0;
exports.getTerminalWidth = getTerminalWidth;
exports.gerarBorda = gerarBorda;
exports.gerarBordaDeErro = gerarBordaDeErro;
exports.exibirLogo = exibirLogo;
exports.displayHeader = displayHeader;
exports.exibirTituloCentralizado = exibirTituloCentralizado;
exports.exibirTitulo = exibirTitulo;
exports.generalizarMenus = generalizarMenus;
exports.centerText = centerText;
exports.centerTitle = centerTitle;
const cfonts_1 = __importDefault(require("cfonts"));
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("../utils");
exports.chalk = require('chalk');
/**
 * Retorna a largura do terminal, com fallback para 80 colunas.
 */
function getTerminalWidth() {
    return process.stdout.columns || 80;
}
/**
 * Gera uma borda padrão usando o caractere "=".
 * @returns {string} A borda gerada.
 */
function gerarBorda() {
    const larguraTerminal = getTerminalWidth();
    return '='.repeat(larguraTerminal);
}
/**
 * Gera uma borda de erro estilizada usando o caractere "-".
 * @returns {string} A borda de erro gerada.
 */
function gerarBordaDeErro() {
    const larguraTerminal = getTerminalWidth();
    return exports.chalk.red('-'.repeat(larguraTerminal));
}
/**
 * Exibe o logo da SIMPLEE usando o pacote cfonts.
 */
function exibirLogo() {
    try {
        const result = cfonts_1.default.render("SIMPLEE", {
            font: 'block',
            align: 'center',
            colors: ['cyan', 'white'],
            letterSpacing: 1,
            lineHeight: 1,
            space: true,
            maxLength: '0'
        });
        if (!result || typeof result === 'boolean')
            return;
        const lines = result.string.split('\n');
        lines.forEach((line) => {
            console.log(centerText(line));
        });
    }
    catch (error) {
        console.error("Erro ao exibir o logo:", error);
    }
}
/**
 * Exibe um cabeçalho estilizado, com borda, título centralizado e opcional subtítulo.
 * Se o título for "SIMPLEE", exibe também o logo.
 * @param titulo - Texto do título.
 * @param subTitulo - Texto opcional do subtítulo.
 */
function displayHeader(titulo, subTitulo) {
    (0, utils_1.clearConsole)();
    const borda = gerarBorda();
    console.log(borda);
    if (titulo.toUpperCase() === 'SIMPLEE') {
        exibirLogo();
    }
    const larguraTerminal = getTerminalWidth();
    const tituloFormatado = exports.chalk.bold.blue(titulo.toUpperCase());
    titulo.toUpperCase() === 'SIMPLEE' ? '' : console.log(centerTitle(tituloFormatado));
    if (subTitulo) {
        const subtituloFormatado = exports.chalk.italic.green(subTitulo);
        const espacosSub = ' '.repeat(Math.floor((larguraTerminal - subTitulo.length) / 2));
        console.log(espacosSub + subtituloFormatado);
    }
    console.log(borda);
}
/**
 * Retorna o título centralizado e estilizado.
 * @param titulo - O texto do título.
 * @returns {string} Título centralizado.
 */
function exibirTituloCentralizado(titulo) {
    const larguraTerminal = getTerminalWidth();
    const tituloFormatado = exports.chalk.bold.blue(titulo.toUpperCase());
    const espacos = ' '.repeat(Math.floor((larguraTerminal - titulo.length) / 2));
    return espacos + tituloFormatado;
}
/**
 * Exibe um título com bordas acima e abaixo.
 * @param titulo - O texto do título.
 */
function exibirTitulo(titulo) {
    const borda = gerarBorda();
    console.log(borda);
    console.log(exibirTituloCentralizado(titulo));
    console.log(borda);
}
/**
 * Exibe um menu interativo com as opções fornecidas e retorna a escolha do usuário.
 * @param options - Array de opções, cada uma com um nome e um valor.
 * @returns {Promise<number>} Resolução com o valor escolhido.
 */
async function generalizarMenus(options) {
    try {
        const resposta = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: exports.chalk.yellow(centerText('Escolha uma opção:')),
                choices: options,
            },
        ]);
        return resposta.opcao;
    }
    catch (error) {
        console.error(exports.chalk.red("Erro na seleção do menu:"), error);
        throw error;
    }
}
//
function stripAnsi(text) {
    return text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
/**
 * Ajuda a centralizar algumas coisas nas funções, ela serve para auxiliar.
 * @param text - O texto a ser centralizado.
 * @returns {string} Texto centralizado.
 */
function centerText(text) {
    const terminalWidth = process.stdout.columns || 80;
    // Split text into lines and trim left side for left-alignment.
    const lines = text.split('\n').map(line => line.trimStart());
    // Center each line individually.
    const centeredLines = lines.map(line => {
        const cleanLine = stripAnsi(line);
        const pad = Math.floor((terminalWidth - cleanLine.length) / 2);
        return pad > 0 ? ' '.repeat(pad - 2) + line : line;
    });
    return centeredLines.join('\n');
}
/**
 * Ajuda a centralizar os titulos.
 * @param title - titulo a ser centralizado.
 * @returns {string} Texto centralizado.
 */
function centerTitle(title) {
    const terminalWidth = process.stdout.columns || 80;
    // Split title into lines and trim left side for left-alignment.
    const lines = title.split('\n').map(line => line.trimStart());
    // Center each line individually.
    const centeredLines = lines.map(line => {
        const cleanLine = stripAnsi(line);
        const pad = Math.floor((terminalWidth - cleanLine.length) / 2);
        return pad > 0 ? ' '.repeat(pad) + line : line;
    });
    return centeredLines.join('\n');
}
