"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarBorda = gerarBorda;
exports.exibirLogo = exibirLogo;
const cfonts_1 = __importDefault(require("cfonts"));
// Função para calcular o tamanho adequado da borda
function gerarBorda(tamanho) {
    return '='.repeat(tamanho);
}
//função que retorna o logo da SIMPLEE
function exibirLogo() {
    cfonts_1.default.say("SIMPLEE", {
        font: 'block', // Estilo da fonte
        align: 'center', // Alinhamento centralizado
        colors: ['cyan', 'white'], // Cores do texto
        letterSpacing: 1, // Espaçamento entre as letras
        lineHeight: 1, // Altura da linha
        // Não definindo o fundo, o terminal usará o fundo padrão
    });
}
