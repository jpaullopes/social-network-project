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
        // Definindo as opções do menu
        const opcoes = [
            { name: 'Criar Perfil', value: 1 },
            { name: 'Acessar Conta', value: 2 },
            { name: 'Sair', value: 3 },
        ];
        // Exibindo o cabeçalho com a gerarBorda() ajustada
        console.log((0, utilsAuxiliaresMenu_1.gerarBorda)());
        (0, utilsAuxiliaresMenu_1.exibirLogo)(); // Exibindo o logo
        console.log((0, utilsAuxiliaresMenu_1.gerarBorda)());
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
            const resposata = yield (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes, titulo);
            return resposata;
        }
    });
}
//menu de interações com emojis
function menuInteracoes() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
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
        const resposta = yield (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes, titulo);
        return resposta;
    });
}
//menu da aba de amigos
function menuAbaAmigos() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
        // Definindo o título e as opções
        const titulo = 'ABA AMIGOS';
        const opcoes = [
            { name: 'Adicionar Amigo', value: 1 },
            { name: 'Lista de Amigos', value: 2 },
            { name: 'Ver Pedidos de Amizade', value: 3 },
            { name: 'Voltar', value: 0 },
        ];
        const resposta = yield (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes, titulo);
        return resposta;
    });
}
//menu para gerenciar perfis
function menuGerenciarPerfis() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
        // Definindo o título e as opções
        const titulo = 'GERENCIAR PERFIS';
        const opcoes = [
            { name: 'Exibir Perfis', value: 1 },
            { name: 'Desativar Perfil', value: 2 },
            { name: 'Ativar Perfil', value: 3 },
            { name: 'Pesquisar (Nome)', value: 4 },
            { name: 'Voltar', value: 0 },
        ];
        const resposta = yield (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes, titulo);
        return resposta;
    });
}
