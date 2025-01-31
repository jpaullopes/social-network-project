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
exports.buscarPerfil = buscarPerfil;
exports.menuFiltrosFeed = menuFiltrosFeed;
exports.menuPublicacao = menuPublicacao;
exports.mensagemErro = mensagemErro;
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
//função que vai ser responsável pela pesquisa de perfis
//sujeito a muitas mudanças em decorrência do array de perfis
function buscarPerfil(perfis) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) { //inicia o loob de busca e já manda uma pergunta
            const resposta = yield inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "pesquisa",
                    message: "Digite o nome do perfil para busca (ou digite 'sair' para encerrar):",
                },
            ]);
            const pesquisa = resposta.pesquisa.toLowerCase(); //coloca tudo em minúsculo pra não ter problema
            if (pesquisa === 'sair') { //caso sair seja digitado
                console.log("Encerrando a busca.");
                break;
            }
            // Filtra os perfis com base na pesquisa 
            //PARTE SUJEITA A MUDANÇAS DEVIDO AO ARRAY DE PERFIS
            const resultados = perfis.filter(perfil => perfil.nome.toLowerCase().includes(pesquisa));
            if (resultados.length === 0) { //nenhum nome foi encontrado
                console.log("Nenhum perfil encontrado.");
                continue;
            }
            // Cria uma lista de nomes para selecionar
            const escolhas = resultados.map(perfil => perfil.nome); //parte também sujeita a mudanças em decorrência do array de perfis E VAI TER QUE TER FOTO DE PERFIL
            escolhas.push('Sair'); // adiciona sair na lista de escolhas
            const { escolha } = yield inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "escolha",
                    message: "Selecione um perfil ou escolha 'Sair' para encerrar:",
                    choices: escolhas
                }
            ]);
            if (escolha === 'Sair') {
                console.log("Encerrando a busca.");
                break;
            }
            return escolha; //retorna o nome do perfil escolhido
        }
    });
}
//filtros feed
function menuFiltrosFeed() {
    return __awaiter(this, void 0, void 0, function* () {
        // Limpando o console
        (0, utils_1.clearConsole)();
        // Definindo o título e as opções
        const titulo = 'FILTROS';
        const opcoes = [
            { name: 'Crescente (Data)', value: 1 },
            { name: 'Decrescente (Data)', value: 2 },
            { name: 'Crescente (Interacoes)', value: 3 },
            { name: 'Decrescente (Interacoes)', value: 4 },
            { name: 'Exibir Publicações de Amigos', value: 5 },
            { name: 'Somente Publicações Normais', value: 6 },
            { name: 'Somente Publicações Avançadas', value: 7 },
            { name: 'Voltar', value: 0 },
        ];
        const resposta = yield (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes, titulo);
        return resposta;
    });
}
//menu de publicação
function menuPublicacao() {
    (0, utils_1.clearConsole)();
    const titulo = 'PUBLICAR';
    const opcoes = [
        { name: 'Publicação Simples', value: 1 },
        { name: 'Publicação Avançada', value: 2 },
        { name: 'Voltar', value: 0 },
    ];
    const resposta = (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes, titulo);
    return resposta;
}
//mensagem de erro
/**MENSAGEM DE ERRO
--------------------
[1] TENTAR NOVAMENTE
[2] VOLTAR MENU INICIAL */
function mensagemErro() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, utils_1.clearConsole)();
        const titulo = utilsAuxiliaresMenu_1.chalk.red('ERROR'); //titulo de mensagem de erro
        const larguraTerminal = process.stdout.columns;
        const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título 
        //titulo centralizado
        const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
        console.log((0, utilsAuxiliaresMenu_1.gerarBordaDeErro)());
        console.log(tituloCentralizado);
        console.log((0, utilsAuxiliaresMenu_1.gerarBordaDeErro)());
        const resposta = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção:',
                choices: [
                    { name: 'Tentar Novamente', value: 1 },
                    { name: 'Voltar Menu Inicial', value: 2 },
                ],
            }
        ]);
        return resposta.opcao;
    });
}
