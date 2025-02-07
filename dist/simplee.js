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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./models/App");
const utilsExibicoes_1 = require("./utils/utilsExibicoes");
const menu = __importStar(require("./utils/utils-menu/utilsMenu"));
// Instância da aplicação
let simplee = new App_1.App();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let opcaoAtual;
        let usuarioAtual;
        // Camada 1: Menu inicial
        do {
            opcaoAtual = yield menu.menuInicial();
            if (opcaoAtual === 1) {
                // Cadastrar usuário
                yield simplee.cadastrarUsuario();
            }
            else if (opcaoAtual === 2) {
                // Login
                usuarioAtual = yield simplee.login();
                if (usuarioAtual) {
                    let opcaoCamadaDois;
                    camadaDois: do {
                        opcaoCamadaDois = yield menu.menuPaginaPrincipal(simplee.verificarPerfilAvancado(usuarioAtual));
                        if (opcaoCamadaDois === 1) {
                            // Camada de Publicação: usuário deseja realizar uma publicação
                            let opcaoTipoPublicacao;
                            do {
                                opcaoTipoPublicacao = yield menu.menuPublicacao();
                                if (opcaoTipoPublicacao === 1) {
                                    // Publicação simples
                                    yield simplee.fazerPublicacao(usuarioAtual);
                                }
                                else if (opcaoTipoPublicacao === 2) {
                                    // Publicação avançada
                                    yield simplee.fazerPublicacao(usuarioAtual, true);
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
                            let opcaoCamadaFeed;
                            do {
                                opcaoCamadaFeed = yield simplee.menuFeed();
                                if (opcaoCamadaFeed === 1) {
                                    // Acessar a camada de filtros no feed
                                    let camadaFiltrosPublicacao;
                                    do {
                                        camadaFiltrosPublicacao = yield menu.menuFiltrosFeed();
                                        if (camadaFiltrosPublicacao === 1) {
                                            // Crescente (Data)
                                            //simplee.listarPublicacoes("data", "crescente");
                                        }
                                        else if (camadaFiltrosPublicacao === 2) {
                                            // Decrescente (Data)
                                            //simplee.listarPublicacoes("data", "decrescente");
                                        }
                                        else if (camadaFiltrosPublicacao === 3) {
                                            // Crescente (Interações)
                                            //simplee.listarPublicacoes("interacoes", "crescente");
                                        }
                                        else if (camadaFiltrosPublicacao === 4) {
                                            // Decrescente (Interações)
                                            //simplee.listarPublicacoes("interacoes", "decrescente");
                                        }
                                        else if (camadaFiltrosPublicacao === 5) {
                                            // Exibir Publicações de Amigos
                                            //simplee.listarPublicacoes("amigos");
                                        }
                                        else if (camadaFiltrosPublicacao === 6) {
                                            // Somente Publicações Normais
                                            //simplee.listarPublicacoes("normais");
                                        }
                                        else if (camadaFiltrosPublicacao === 7) {
                                            // Somente Publicações Avançadas
                                            //simplee.listarPublicacoes("avancadas");
                                        }
                                        else if (camadaFiltrosPublicacao === 0) {
                                            // Voltar
                                            break;
                                        }
                                        else {
                                            console.log("Opção inválida.");
                                        }
                                    } while (true);
                                }
                                else if (opcaoCamadaFeed === 2) {
                                    // Interagir com publicação (implementar lógica)
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
                                opcaoCamadaTres = yield menu.menuAbaAmigos();
                                if (opcaoCamadaTres === 1) {
                                    // Adicionar amigo (implementar a lógica)
                                }
                                else if (opcaoCamadaTres === 2) {
                                    // Listar amigos (implementar a lógica)
                                }
                                else if (opcaoCamadaTres === 3) {
                                    // Ver pedidos de amizade (implementar a lógica)
                                }
                                else if (opcaoCamadaTres === 4) {
                                    // Remover amigo (implementar a lógica)
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
                            // Alterar descrição do perfil
                            yield simplee.alterarDescricaoPerfil(usuarioAtual);
                        }
                        else if (opcaoCamadaDois === 5) {
                            // Gerenciar perfis
                            let opcaoCamadaQuatro;
                            do {
                                opcaoCamadaQuatro = yield menu.menuGerenciarPerfis();
                                if (opcaoCamadaQuatro === 1) {
                                    // Listar perfis
                                    simplee.listarPerfis();
                                }
                                else if (opcaoCamadaQuatro === 2) {
                                    // Desativar perfil (implementar a lógica)
                                    simplee.buscarPerfil(); // Exemplo, implementar corretamente
                                }
                                else if (opcaoCamadaQuatro === 3) {
                                    // Ativar perfil (implementar a lógica)
                                }
                                else if (opcaoCamadaQuatro === 4) {
                                    // Pesquisar perfil (implementar a lógica)
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
    });
}
main();
