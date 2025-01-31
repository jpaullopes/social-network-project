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
exports.GerarTituloCentralizado = GerarTituloCentralizado;
exports.exibiçãoDeTitulo = exibiçãoDeTitulo;
exports.generalizarMenus = generalizarMenus;
const cfonts_1 = __importDefault(require("cfonts"));
const inquirer_1 = __importDefault(require("inquirer"));
exports.chalk = require('chalk');
// Função para calcular o larguraTerminal adequado da borda
function gerarBorda() {
    //detecta a largura do terminal
    let larguraTerminal = process.stdout.columns;
    return '='.repeat(larguraTerminal);
}
function gerarBordaDeErro() {
    //detecta a largura do terminal
    let larguraTerminal = process.stdout.columns;
    return exports.chalk.red('-'.repeat(larguraTerminal));
}
//função que retorna o logo da SIMPLEE
function exibirLogo() {
    cfonts_1.default.say("SIMPLEE", {
        font: 'block', // Estilo da fonte
        align: 'center', // Alinhamento centralizado
        colors: ['cyan', 'white',], // Cores do texto
        letterSpacing: 1, // Espaçamento entre as letras
        lineHeight: 1, // Altura da linha
        // Não definindo o fundo, o terminal usará o fundo padrão
    });
}
function GerarTituloCentralizado(titulo) {
    // Detectando a largura do terminal
    const larguraTerminal = process.stdout.columns;
    // Criando as bordas com base na largura do terminal
    gerarBorda();
    const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título 
    //titulo centralizado
    const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
    return tituloCentralizado;
}
function exibiçãoDeTitulo(titulo) {
    // gerando borda e titulo centralizado
    console.log(gerarBorda());
    console.log(GerarTituloCentralizado(titulo));
    console.log(gerarBorda());
}
//função que generaliza a escolha de menu
//vai facilitar muita minha vida
function generalizarMenus(options, titulo) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        exibiçãoDeTitulo(titulo);
        // Exibindo o prompt para o menu interativo
        const resposta = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção:',
                choices: options,
            },
        ]);
        //Retornando a escolha do usuario
        resolve(resposta.opcao);
    }));
}
