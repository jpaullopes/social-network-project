"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
<<<<<<< HEAD
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
=======
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
>>>>>>> 5c9b942465fd39b5b0abae2d323f22160d58297d
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizarPerfilEPublicacoes = visualizarPerfilEPublicacoes;
const App_1 = require("./models/App");
const utilsExibicoes_1 = require("./utils/utilsExibicoes");
const menu = __importStar(require("./utils/utils-menu/utilsMenu"));
const inquirer_1 = __importDefault(require("inquirer"));
const utilsAuxiliaresMenu_1 = require("./utils/utils-menu/utilsAuxiliaresMenu");
// Instância da aplicação
let simplee = new App_1.App();
// Linka interações com publicações e perfis
simplee.linkarDados();
async function main() {
    let opcaoAtual;
    let usuarioAtual;
    // Camada 1: Menu inicial
    do {
        try {
            // Atualiza os dados (usuários, publicações, interações e suas ligações)
            await simplee.recarregarDados();
            opcaoAtual = await menu.menuInicial();
            if (opcaoAtual === 1) {
                // Cadastrar usuário
                await simplee.cadastrarUsuario();
                // Após escrita, recarrega os dados
                await simplee.recarregarDados();
            }
            else if (opcaoAtual === 2) {
                // Login
                usuarioAtual = await simplee.login();
                if (usuarioAtual) {
                    let opcaoCamadaDois;
                    camadaDois: do {
                        try {
                            // Camada 2: Menu principal
                            // Antes de exibir o menu principal, sincroniza os dados
                            await simplee.recarregarDados();
                            // Atualiza a referência do usuário logado
                            usuarioAtual = simplee.buscarPerfilPorNome(usuarioAtual.nome);
                            opcaoCamadaDois = await menu.menuPaginaPrincipal(usuarioAtual);
                            if (opcaoCamadaDois === 1) {
                                // Camada de Publicação: usuário deseja realizar uma publicação
                                let opcaoTipoPublicacao;
                                do {
                                    try {
                                        opcaoTipoPublicacao = await menu.menuPublicacao();
                                        if (opcaoTipoPublicacao === 1) {
                                            // Publicação simples
                                            await simplee.recarregarDados();
                                            await simplee.fazerPublicacao(usuarioAtual);
                                        }
                                        else if (opcaoTipoPublicacao === 2) {
                                            // Publicação avançada
                                            await simplee.recarregarDados();
                                            await simplee.fazerPublicacao(usuarioAtual, true);
                                        }
                                        else if (opcaoTipoPublicacao === 0) {
                                            // Voltar da camada de publicação para o menu principal (camada 2)
                                            break;
                                        }
                                        else {
                                            console.log("Opção inválida.");
                                        }
                                    }
                                    catch (error) {
                                        console.error("Erro no simplee:", error);
                                    }
                                } while (true);
                                continue camadaDois;
                            }
                            else if (opcaoCamadaDois === 2) {
                                // Exibir feed e interagir com publicações
                                await simplee.recarregarDados();
                                let opcaoCamadaFeed;
                                do {
                                    try {
                                        opcaoCamadaFeed = await menu.menuFeed(usuarioAtual, simplee);
                                        if (opcaoCamadaFeed === 1) {
                                            // perquisar perfil pra ver as publicações
                                            let perfilSelecionado = await menu.buscarPerfilNormal(simplee, usuarioAtual);
                                            if (perfilSelecionado) {
                                                await (0, utilsExibicoes_1.exibirPublicacoes)(perfilSelecionado, simplee);
                                            }
                                        }
                                        else if (opcaoCamadaFeed === 2) {
                                            // Interagir com publicação 
                                            //aqui tem que aparece só publicações avançadas  para interagir
                                            let publicacaoEscolhida = await simplee.exibirPublicacoesInterativas(simplee.filtrarPublicacoesAvancadas(usuarioAtual));
                                            if (publicacaoEscolhida) {
                                                await simplee.interagirPublicacao(publicacaoEscolhida, usuarioAtual);
                                            }
                                            else {
                                                console.log("Nenhuma publicação disponível para interação.");
                                            }
                                        }
                                        else if (opcaoCamadaFeed === 3) {
                                            // 
                                            await simplee.exibirListaPublicacoesCompleto();
                                        }
                                        else if (opcaoCamadaFeed === 4) {
                                            // Ver publicações do user
                                            await simplee.exibirListaPublicacoesUser(usuarioAtual);
                                        }
                                        else if (opcaoCamadaFeed === 0) {
                                            // Voltar para o menu principal (camada 2)
                                            break;
                                        }
                                        else {
                                            console.log("Opção inválida.");
                                        }
                                    }
                                    catch (error) {
                                        console.error("Erro no simplee:", error);
                                    }
                                } while (true);
                            }
                            else if (opcaoCamadaDois === 3) {
                                // Aba de amigos
                                let opcaoCamadaTres;
                                do {
                                    try {
                                        opcaoCamadaTres = await menu.menuAbaAmigos(simplee, usuarioAtual);
                                        if (opcaoCamadaTres === 1) {
                                            // Adicionar amigo é aqui
                                            //o buscar perfil exibe uma aba de pesquisa que mostra os perfis disponiveis para adicionar
                                            let usuarioAdicionar;
                                            usuarioAdicionar = await menu.buscarPerfilComMenu(simplee, usuarioAtual);
                                            if (usuarioAdicionar) {
                                                simplee.fazerPedidoAmizade(usuarioAtual, usuarioAdicionar);
                                            }
                                        }
                                        else if (opcaoCamadaTres === 2) {
                                            //Listar amigos 
                                            let perfilAmigoSelecionado = await simplee.exibirAmigosInterativos(usuarioAtual);
                                            if (perfilAmigoSelecionado) {
                                                await (0, utilsExibicoes_1.exibirPerfilEPublicacoes)(perfilAmigoSelecionado, simplee);
                                            }
                                        }
                                        else if (opcaoCamadaTres === 3) {
                                            // Ver pedidos de amizade 
                                            await simplee.exibirPedidosAmizade(usuarioAtual);
                                        }
                                        else if (opcaoCamadaTres === 4) {
                                            // Remover amigo 
                                            await simplee.removerAmigo(usuarioAtual);
                                        }
                                        else if (opcaoCamadaTres === 0) {
                                            // Voltar
                                            break;
                                        }
                                        else {
                                            console.log("Opção inválida.");
                                        }
                                    }
                                    catch (error) {
                                        console.error("Erro no simplee:", error);
                                    }
                                } while (true);
                            }
                            else if (opcaoCamadaDois === 4) {
                                //camada de configurações do perfil
                                let opcaoCamadaQuatro;
                                do {
                                    try {
                                        opcaoCamadaQuatro = await menu.menuConfiguracoes();
                                        if (opcaoCamadaQuatro === 1) {
                                            // Alterar descrição do perfil
                                            await simplee.alterarDescricaoPerfil(usuarioAtual);
                                        }
                                        else if (opcaoCamadaQuatro === 2) {
                                            // Alterar senha do perfil
                                            await simplee.alterarSenha(usuarioAtual);
                                        }
                                        else if (opcaoCamadaQuatro === 3) {
                                            // Alterar foto/emoji
                                            await simplee.alterarFotoPerfil(usuarioAtual);
                                        }
                                        else if (opcaoCamadaQuatro === 0) {
                                            // Voltar
                                            break;
                                        }
                                        else {
                                            console.log("Opção inválida.");
                                        }
                                    }
                                    catch (error) {
                                        console.error("Erro no simplee:", error);
                                    }
                                } while (true);
                            }
                            else if (opcaoCamadaDois === 5) {
                                // Gerenciar perfis
                                let opcaoCamadaQuatro;
                                do {
                                    try {
                                        opcaoCamadaQuatro = await menu.menuGerenciarPerfis(simplee);
                                        if (opcaoCamadaQuatro === 1) {
                                            // Listar perfis
                                            await simplee.exibirListaPerfisCompleto();
                                        }
                                        else if (opcaoCamadaQuatro === 2) {
                                            // Desativar perfil 
                                            await simplee.alternarStatusPorFiltro(true);
                                        }
                                        else if (opcaoCamadaQuatro === 3) {
                                            // Ativar perfil 
                                            await simplee.alternarStatusPorFiltro(false);
                                        }
                                        else if (opcaoCamadaQuatro === 0) {
                                            // oltar
                                            break;
                                        }
                                        else {
                                            console.log("Opção inválida.");
                                        }
                                    }
                                    catch (error) {
                                        console.error("Erro no simplee:", error);
                                    }
                                } while (true);
                            }
                            else if (opcaoCamadaDois === 6) {
                                //criar outro perfil adm
                                await simplee.cadastrarUsuario(true);
                            }
                            else if (opcaoCamadaDois === 7) {
                            }
                            else if (opcaoCamadaDois === 0) {
                                // Voltar para o menu inicial (camada 1)
                                break;
                            }
                            else {
                                console.log("Opção inválida.");
                            }
                        }
                        catch (error) {
                            console.error("Erro no simplee:", error);
                        }
                    } while (true);
                }
            }
            else if (opcaoAtual === 0) {
                (0, utilsExibicoes_1.exibirMensagemCaixa)("Obrigado por usar o Simplee! Até a próxima.");
                break;
            }
            else {
                console.log("Opção inválida.");
            }
        }
        catch (error) {
            console.error("Erro no simplee:", error);
        }
    } while (true);
}
main();
function buscarPerfilComNome(simplee) {
    throw new Error("Function not implemented.");
}
// Nova função para buscar perfis (exceto o usuário atual) e exibir o perfil com suas publicações
async function visualizarPerfilEPublicacoes(app, usuarioAtual) {
    try {
        // Obtém todos os perfis exceto o usuário atual
        const perfis = app.getPerfis().filter(p => p.nome !== usuarioAtual.nome);
        // Prompt para busca
        const { termoBusca } = await inquirer_1.default.prompt([
            {
                name: "termoBusca",
                message: "Digite o nome para buscar (ou deixe vazio para listar todos):",
                type: "input"
            }
        ]);
        const termo = termoBusca.trim().toLowerCase();
        const perfisFiltrados = termo ? perfis.filter(p => p.nome.toLowerCase().includes(termo)) : perfis;
        if (perfisFiltrados.length === 0) {
            console.log((0, utilsAuxiliaresMenu_1.centerText)("Nenhum perfil encontrado."));
            await inquirer_1.default.prompt([{
                    name: "voltar",
                    message: "Pressione ENTER para voltar.",
                    type: "input"
                }]);
            return;
        }
        // Cria as opções para o menu
        const opcoes = perfisFiltrados.map(p => ({
            name: p.exibirPerfilCompleto(), // Exibe o perfil com detalhes
            value: p
        }));
        opcoes.push({ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null });
        const { perfilSelecionado } = await inquirer_1.default.prompt([
            {
                name: "perfilSelecionado",
                type: "list",
                message: (0, utilsAuxiliaresMenu_1.centerText)("Selecione um perfil para visualizar suas publicações:"),
                choices: opcoes,
                pageSize: 30
            }
        ]);
        if (!perfilSelecionado)
            return;
        // Exibe o perfil selecionado e suas publicações
        console.clear();
        console.log(perfilSelecionado.exibirPerfilCompleto());
        const pubs = app.buscarPublicacoesPorPerfil(perfilSelecionado);
        if (pubs.length === 0) {
            console.log((0, utilsAuxiliaresMenu_1.centerText)("Nenhuma publicação encontrada para este perfil."));
        }
        else {
            pubs.forEach(pub => {
                console.log(pub.getExibicaoFormatada(true));
            });
        }
        // Exibe uma box "Voltar" para interação
        await inquirer_1.default.prompt([
            {
                name: "voltar",
                type: "list",
                message: (0, utilsAuxiliaresMenu_1.centerText)("Pressione para voltar:"),
                choices: [{ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null }],
                pageSize: 10
            }
        ]);
    }
    catch (error) {
        console.error("Erro no simplee:", error);
    }
}
