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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./models/App");
const utilsExibicoes_1 = require("./utils/utilsExibicoes");
const menu = __importStar(require("./utils/utils-menu/utilsMenu"));
// Instância da aplicação
let simplee = new App_1.App();
// Linka interações com publicações e perfis
simplee.linkarDados();
async function main() {
    let opcaoAtual;
    let usuarioAtual;
    // Camada 1: Menu inicial
    do {
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
                        } while (true);
                        continue camadaDois;
                    }
                    else if (opcaoCamadaDois === 2) {
                        // Exibir feed e interagir com publicações
                        await simplee.recarregarDados();
                        let opcaoCamadaFeed;
                        do {
                            opcaoCamadaFeed = await menu.menuFeed(usuarioAtual, simplee);
                            if (opcaoCamadaFeed === 1) {
                                // perquisar perfil pra ver as publicações
                                let perfilSelecionado = await menu.buscarPerfilNormal(simplee, usuarioAtual);
                                if (perfilSelecionado) {
                                    await (0, utilsExibicoes_1.exibirPerfilEPublicacoes)(perfilSelecionado, simplee);
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
                                // Ver interações
                                await simplee.exibirListaPublicacoesCompleto();
                            }
                            else if (opcaoCamadaFeed === 0) {
                                // Voltar para o menu principal (camada 2)
                                break;
                            }
                            else {
                                console.log("Opção inválida.");
                            }
                        } while (true);
                    }
                    else if (opcaoCamadaDois === 3) {
                        // Aba de amigos
                        let opcaoCamadaTres;
                        do {
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
                        } while (true);
                    }
                    else if (opcaoCamadaDois === 4) {
                        //camada de configurações do perfil
                        let opcaoCamadaQuatro;
                        do {
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
                                //await simplee.alterarSenhaPerfil(usuarioAtual);
                            }
                            else if (opcaoCamadaQuatro === 0) {
                                // Voltar
                                break;
                            }
                            else {
                                console.log("Opção inválida.");
                            }
                        } while (true);
                    }
                    else if (opcaoCamadaDois === 5) {
                        // Gerenciar perfis
                        let opcaoCamadaQuatro;
                        do {
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
                            else if (opcaoCamadaQuatro === 4) {
                                // Pesquisar perfil //aqui o perfil vai retornar algumas coisas há mais sobre ele além das publicações
                            }
                            else if (opcaoCamadaQuatro === 0) {
                                // oltar
                                break;
                            }
                            else {
                                console.log("Opção inválida.");
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
    } while (true);
}
main();
function buscarPerfilComNome(simplee) {
    throw new Error("Function not implemented.");
}
