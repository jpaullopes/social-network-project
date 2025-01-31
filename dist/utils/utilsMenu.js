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
const inquirer_1 = __importDefault(require("inquirer"));
const cfonts_1 = __importDefault(require("cfonts"));
const utils_1 = require("./utils");
// Função para calcular o tamanho adequado da borda
function gerarBorda(tamanho) {
    return '='.repeat(tamanho);
}
// Função principal para exibir o menu
function exibirMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        // Detectando a largura do terminal
        // Detectando a largura do terminal
        const larguraTerminal = process.stdout.columns;
        // Definindo o título e as opções
        const titulo = 'SIMPLEE';
        const opcoes = [
            { name: 'Criar Perfil', value: 1 },
            { name: 'Acessar Conta', value: 2 },
            { name: 'Sair', value: 3 },
        ];
        // Criando as bordas com base na largura do terminal
        const borda = gerarBorda(larguraTerminal);
        const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título
        // Exibindo o cabeçalho com a borda ajustada
        console.log(borda);
        cfonts_1.default.say(titulo, {
            font: 'block', // Estilo da fonte
            align: 'center', // Alinhamento centralizado
            colors: ['cyan', 'white'], // Cores do texto
            letterSpacing: 1, // Espaçamento entre as letras
            lineHeight: 1, // Altura da linha
            // Não definindo o fundo, o terminal usará o fundo padrão
        });
        console.log(borda);
        // Exibindo o prompt para o menu interativo
        const resposta = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção:',
                choices: opcoes,
            },
        ]);
        // Tratando a resposta
        return resposta.opcao;
    });
}
(0, utils_1.clearConsole)();
// Chamar a função para exibir o menu
console.log(exibirMenu());
