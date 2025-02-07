"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalk = void 0;
exports.gerarBorda = gerarBorda;
exports.gerarBordaDeErro = gerarBordaDeErro;
exports.exibirLogo = exibirLogo;
exports.displayHeader = displayHeader;
exports.exibirTituloCentralizado = exibirTituloCentralizado;
exports.exibirTitulo = exibirTitulo;
exports.generalizarMenus = generalizarMenus;
exports.centerText = centerText;
exports.centerTitle = centerTitle;
exports.exibirMensagemCaixa = exibirMensagemCaixa;
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
        cfonts_1.default.say("SIMPLEE", {
            font: 'block', // Estilo da fonte
            align: 'center', // Centraliza o logo
            colors: ['cyan', 'white'],
            letterSpacing: 1, // Espaçamento entre as letras
            lineHeight: 1, // Altura da linha
        });
    }
    catch (error) {
        console.error(exports.chalk.red("Erro ao exibir o logo:"), error);
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
function generalizarMenus(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resposta = yield inquirer_1.default.prompt([
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
    });
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
/**
 * Exibe uma mensagem dentro de uma caixinha desenhada com caracteres Unicode.
 * @param mensagem - A mensagem a ser exibida.
 */
function exibirMensagemCaixa(mensagem) {
    (0, utils_1.clearConsole)();
    const terminalWidth = getTerminalWidth();
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
