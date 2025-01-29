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
exports.menuInicial = menuInicial;
exports.menuPaginaPrincipal = menuPaginaPrincipal;
exports.menuInteracoes = menuInteracoes;
exports.menuAbaAmigos = menuAbaAmigos;
exports.menuGerenciarPerfis = menuGerenciarPerfis;
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("../utils");
const utilsAuxiliaresMenu_1 = require("./utilsAuxiliaresMenu");
// Função para exibir o menu inicial
function menuInicial() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
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
        const borda = (0, utilsAuxiliaresMenu_1.gerarBorda)(larguraTerminal);
        //const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título -> talvez seja util
        // Exibindo o cabeçalho com a borda ajustada
        console.log(borda);
        (0, utilsAuxiliaresMenu_1.exibirLogo)(); // Exibindo o logo
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
        //Retornando a escolha do usuario
        return resposta.opcao;
    });
}
//menu referente ao menu principla da rede social
function menuPaginaPrincipal(adm) {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
        //para centralizar o titulo
        let titulo = 'REDE SOCIAL';
        let opcoes = [
            { name: 'Realizar Publicação', value: 1 },
            { name: 'Feed', value: 2 },
            { name: 'Aba Amigos', value: 3 },
            { name: 'Alterar Descrição Perfil', value: 4 },
            { name: 'Sair', value: 0 },
        ];
        if (adm) { //caso seja adm as opções são aumentadas 
            /**[4] GERENCIAR PERFIS
             [5] ADICIONAR CONTA ADM */
            titulo = 'REDE SOCIAL ADMINISTRADOR';
            opcoes = [
                { name: 'Realizar Publicação', value: 1 },
                { name: 'Feed', value: 2 },
                { name: 'Aba Amigos', value: 3 },
                { name: 'Alterar Descrição Perfil', value: 4 },
                { name: 'Gerenciar Perfis', value: 5 },
                { name: 'Adicionar Conta ADM', value: 6 },
                { name: 'Sair', value: 0 },
            ];
        }
        // Definindo o título e as opções
        const larguraTerminal = process.stdout.columns; // Obtendo a largura do terminal
        const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título
        const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
        // Criando as bordas com base na largura do terminal
        const borda = (0, utilsAuxiliaresMenu_1.gerarBorda)(larguraTerminal);
        // Exibindo o cabeçalho com a borda ajustada
        console.log(borda);
        console.log(tituloCentralizado);
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
        //Retornando a escolha do usuario
        return resposta.opcao;
    });
}
//menu de interações com emojis
function menuInteracoes() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
        // Detectando a largura do terminal
        const larguraTerminal = process.stdout.columns;
        // Definindo o título e as opções
        const titulo = 'INTERAÇÕES';
        const opcoes = [
            { name: 'Curtir: 👍', value: 1 },
            { name: 'Não Curtir: 👎', value: 2 },
            { name: 'Risos: 😂', value: 3 },
            { name: 'Surpresa: 😲', value: 4 },
            { name: 'Adicionar Amigo', value: 5 },
            { name: 'Voltar', value: 0 },
        ];
        // Criando as bordas com base na largura do terminal
        const borda = (0, utilsAuxiliaresMenu_1.gerarBorda)(larguraTerminal);
        const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2);
        const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
        // Exibindo o cabeçalho com a borda ajustada
        console.log(borda);
        console.log(tituloCentralizado);
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
        //Retornando a escolha do usuario
        return resposta.opcao;
    });
}
//menu da aba de amigos
function menuAbaAmigos() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
        // Detectando a largura do terminal
        const larguraTerminal = process.stdout.columns;
        // Definindo o título e as opções
        const titulo = 'ABA AMIGOS';
        const opcoes = [
            { name: 'Adicionar Amigo', value: 1 },
            { name: 'Lista de Amigos', value: 2 },
            { name: 'Ver Pedidos de Amizade', value: 3 },
            { name: 'Voltar', value: 0 },
        ];
        // Criando as bordas com base na largura do terminal
        const borda = (0, utilsAuxiliaresMenu_1.gerarBorda)(larguraTerminal);
        const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título -> talvez seja util
        //titulo centralizado
        const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
        // Exibindo o cabeçalho com a borda ajustada
        console.log(borda);
        console.log(tituloCentralizado);
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
        //Retornando a escolha do usuario
        return resposta.opcao;
    });
}
//menu para gerenciar perfis
function menuGerenciarPerfis() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
        // Detectando a largura do terminal
        const larguraTerminal = process.stdout.columns;
        // Definindo o título e as opções
        const titulo = 'GERENCIAR PERFIS';
        const opcoes = [
            { name: 'Exibir Perfis', value: 1 },
            { name: 'Desativar Perfil', value: 2 },
            { name: 'Ativar Perfil', value: 3 },
            { name: 'Pesquisar (Nome)', value: 4 },
            { name: 'Voltar', value: 0 },
        ];
        // Criando as bordas com base na largura do terminal
        const borda = (0, utilsAuxiliaresMenu_1.gerarBorda)(larguraTerminal);
        const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título -> talvez seja util
        const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
        // Exibindo o cabeçalho com a borda ajustada
        console.log(borda);
        console.log(tituloCentralizado);
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
        //Retornando a escolha do usuario
        return resposta.opcao;
    });
}
//
