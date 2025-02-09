"use strict";
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
exports.alterarDescricao = alterarDescricao;
exports.menuFeed = menuFeed;
exports.buscarPerfilComMenu = buscarPerfilComMenu;
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("../utils");
const utilsAuxiliaresMenu_1 = require("./utilsAuxiliaresMenu");
/**
 * Exibe o menu inicial e retorna a opção escolhida pelo usuário.
 */
async function menuInicial() {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('SIMPLEE', 'Bem-vindo ao Sistema de Rede Social');
        const opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Criar Perfil'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Acessar Conta'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Sair'), value: 0 },
        ];
        const resposta = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: utilsAuxiliaresMenu_1.chalk.yellow((0, utilsAuxiliaresMenu_1.centerText)('Escolha uma opção:')),
                choices: opcoes,
            },
        ]);
        return resposta.opcao;
    }
    catch (error) {
        console.error("Erro no menuInicial:", error);
        return null;
    }
}
/**
 * Exibe o menu da página principal da rede social.
 * Se 'adm' for true, exibe opções administrativas extras.
 * @param adm - Indicador se o usuário é administrador.
 */
async function menuPaginaPrincipal(perfil) {
    try {
        const titulo = perfil.tipo == 'pa' ? 'REDE SOCIAL ADMINISTRADOR' : 'REDE SOCIAL';
        const estadoPerfil = perfil.status;
        (0, utilsAuxiliaresMenu_1.displayHeader)(titulo);
        console.log(perfil.exibirPerfilFormatado());
        let opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Realizar Publicação'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Feed'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Aba Amigos'), value: 3 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Alterar Descrição Perfil'), value: 4 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Sair'), value: 0 },
        ];
        if (perfil.tipo == 'pa') {
            opcoes = [
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Realizar Publicação'), value: 1 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Feed'), value: 2 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Aba Amigos'), value: 3 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Alterar Descrição Perfil'), value: 4 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Gerenciar Perfis'), value: 5 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Adicionar Conta ADM'), value: 6 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Sair'), value: 0 },
            ];
        }
        //caso o perfil esteja com status false, então ele vai estar desativado e vai ter esse menu
        if (estadoPerfil == false) {
            opcoes = [
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Feed'), value: 2 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Aba Amigos'), value: 3 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Sair'), value: 0 },
            ];
        }
        const resposta = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: utilsAuxiliaresMenu_1.chalk.yellow((0, utilsAuxiliaresMenu_1.centerText)('Escolha uma opção:')),
                choices: opcoes,
            },
        ]);
        return resposta.opcao;
    }
    catch (error) {
        console.error(utilsAuxiliaresMenu_1.chalk.red("Erro no menuPaginaPrincipal:"), error);
        return null;
    }
}
/**
 * Exibe o menu de interações com emojis e retorna a opção escolhida.
 */
async function menuInteracoes(publicacao) {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('INTERAÇÕES');
        console.log(publicacao.exibirPublicacao());
        //para publicação exibir suaa interacao
        publicacao.getInteracoes().forEach(interacao => {
            interacao.exibirInteracaoFormatada();
        });
        const opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Curtir: 👍'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Não Curtir: 👎'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Risos: 😂'), value: 3 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Surpresa: 😲'), value: 4 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Adicionar Amigo'), value: 5 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
        ];
        const resposta = await (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes);
        return resposta;
    }
    catch (error) {
        console.error("Erro no menuInteracoes:", error);
        return null;
    }
}
/**
 * Exibe o menu da Aba Amigos e retorna a opção escolhida.
 */
async function menuAbaAmigos(app, usuarioAtual) {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('ABA AMIGOS');
        let opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Adicionar Amigo'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Lista de Amigos'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Ver Pedidos de Amizade'), value: 3 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Remover Amigo'), value: 4 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
        ];
        //pra verificar se perfil tá desativado
        if (usuarioAtual.status == false) {
            opcoes = [
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Lista de Amigos'), value: 2 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
            ];
        }
        const resposta = await (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes);
        return resposta;
    }
    catch (error) {
        console.error("Erro no menuAbaAmigos:", error);
        return null;
    }
}
/**
 * Exibe o menu para gerenciar perfis e retorna a opção escolhida.
 */
async function menuGerenciarPerfis(app) {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('GERENCIAR PERFIS');
        const opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Exibir Perfis'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Desativar Perfil'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Ativar Perfil'), value: 3 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Pesquisar (Nome)'), value: 4 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
        ];
        app.listarPerfis();
        const resposta = await (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes);
        return resposta;
    }
    catch (error) {
        console.error("Erro no menuGerenciarPerfis:", error);
        return null;
    }
}
/**
 * Realiza a busca de perfis com base no nome informado.
 * @param perfis - Array de objetos com informações dos perfis.
 * @returns Retorna o nome do perfil selecionado ou null se sair.
 */
async function buscarPerfil(perfis) {
    try {
        while (true) {
            (0, utils_1.clearConsole)();
            console.log((0, utilsAuxiliaresMenu_1.gerarBorda)());
            console.log(utilsAuxiliaresMenu_1.chalk.bold.magenta((0, utilsAuxiliaresMenu_1.centerText)('BUSCA DE PERFIS')));
            console.log((0, utilsAuxiliaresMenu_1.gerarBorda)());
            const resposta = await inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "pesquisa",
                    message: utilsAuxiliaresMenu_1.chalk.yellow((0, utilsAuxiliaresMenu_1.centerText)("Digite o nome do perfil para busca (ou 'sair' para encerrar):")),
                },
            ]);
            const pesquisa = resposta.pesquisa.toLowerCase();
            if (pesquisa === 'sair') {
                console.log(utilsAuxiliaresMenu_1.chalk.red((0, utilsAuxiliaresMenu_1.centerText)("Encerrando a busca.")));
                break;
            }
            const resultados = perfis.filter(perfil => perfil.nome.toLowerCase().includes(pesquisa));
            if (resultados.length === 0) {
                console.log(utilsAuxiliaresMenu_1.chalk.red((0, utilsAuxiliaresMenu_1.centerText)("Nenhum perfil encontrado.")));
                continue;
            }
            const escolhas = resultados.map(perfil => (0, utilsAuxiliaresMenu_1.centerText)(perfil.nome));
            escolhas.push((0, utilsAuxiliaresMenu_1.centerText)('Sair'));
            const { escolha } = await inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "escolha",
                    message: utilsAuxiliaresMenu_1.chalk.yellow((0, utilsAuxiliaresMenu_1.centerText)("Selecione um perfil ou 'Sair':")),
                    choices: escolhas,
                },
            ]);
            if (escolha.trim() === 'Sair') {
                console.log(utilsAuxiliaresMenu_1.chalk.red((0, utilsAuxiliaresMenu_1.centerText)("Encerrando a busca.")));
                break;
            }
            return escolha;
        }
        return null;
    }
    catch (error) {
        console.error("Erro no buscarPerfil:", error);
        return null;
    }
}
/**
 * Exibe o menu de filtros para o feed e retorna a opção escolhida.
 */
async function menuFiltrosFeed() {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('FILTROS');
        const opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Crescente (Data)'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Decrescente (Data)'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Crescente (Interações)'), value: 3 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Decrescente (Interações)'), value: 4 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Exibir Publicações de Amigos'), value: 5 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Somente Publicações Normais'), value: 6 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Somente Publicações Avançadas'), value: 7 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
        ];
        const resposta = await (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes);
        return resposta;
    }
    catch (error) {
        console.error("Erro no menuFiltrosFeed:", error);
        return null;
    }
}
/**
 * Exibe o menu de publicação e retorna a opção escolhida.
 */
async function menuPublicacao() {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('PUBLICAR');
        const opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Publicação Simples'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Publicação Avançada'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
        ];
        const resposta = await (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes);
        return resposta;
    }
    catch (error) {
        console.error("Erro no menuPublicacao:", error);
        return null;
    }
}
/**
 * Exibe a mensagem de erro com opções para tentar novamente ou voltar ao menu inicial.
 */
async function mensagemErro() {
    try {
        (0, utils_1.clearConsole)();
        const bordaErro = (0, utilsAuxiliaresMenu_1.gerarBordaDeErro)();
        const larguraTerminal = process.stdout.columns || 80;
        const tituloText = 'ERROR';
        const espacoTitulo = ' '.repeat(Math.floor((larguraTerminal - tituloText.length) / 2));
        const tituloFormatado = utilsAuxiliaresMenu_1.chalk.red.bold(tituloText);
        console.log(bordaErro);
        console.log(espacoTitulo + tituloFormatado);
        console.log(bordaErro);
        const resposta = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: utilsAuxiliaresMenu_1.chalk.yellow('Escolha uma opção:'),
                choices: [
                    { name: (0, utilsAuxiliaresMenu_1.centerText)('Tentar Novamente'), value: 1 },
                    { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar Menu Inicial'), value: 2 },
                ],
            },
        ]);
        return resposta.opcao;
    }
    catch (error) {
        console.error("Erro na mensagemErro:", error);
        return null;
    }
}
/**
 * Exibe o menu de alteração de descrição do perfil.
 */
async function alterarDescricao() {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('ALTERAR DESCRIÇÃO');
        const resposta = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'descricao',
                message: utilsAuxiliaresMenu_1.chalk.yellow('Digite a nova descrição do perfil:'),
            },
        ]);
        return resposta.descricao;
    }
    catch (error) {
        console.error("Erro no menuAlterarDescricao:", error);
        return null;
    }
}
//menu da aba feed
/*FEED
-----------------------
>> PUBLICAÇÕES SENDO EXIBIDOS AQ<<
[1] FILTRAR PUBLICAÇÕES
[2] INTERAGIR COM PUBLICAÇÕES
[0] VOLTAR*/
async function menuFeed(perfilAtual, app) {
    try {
        (0, utilsAuxiliaresMenu_1.displayHeader)('FEED');
        const statusPerfil = perfilAtual.status;
        let opcoes = [
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Filtrar Publicações'), value: 1 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Interagir com Publicações'), value: 2 },
            { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
        ];
        if (statusPerfil == false) {
            opcoes = [
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Filtrar Publicações'), value: 1 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
            ];
        }
        //exibir publicações
        app.listarPublicacoes();
        const resposta = await (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes);
        return resposta;
    }
    catch (error) {
        console.error("Erro no menuFeed:", error);
        return null;
    }
}
//modifique a função buscarPerfil para retornar o nome selecionado diretamente
async function buscarPerfilComMenu(app, usuarioAtual) {
    //só retorna os perfis que o suario ainda não é amigo
    const perfisDisponiveis = app.getPerfis().filter(perfil => !usuarioAtual.ehAmigo(perfil.nome));
    const nomeSelecionado = await buscarPerfil(perfisDisponiveis);
    const perfil = app.buscarPerfilPorNome(nomeSelecionado);
    return perfil;
}
