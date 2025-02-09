import { App } from "./models/App";
import { Perfil } from "./models/Perfil";
import { exibirMensagemCaixa, exibirPerfilEmBox, exibirPerfilEPublicacoes, exibirPublicacoes, getBoxVoltar} from "./utils/utilsExibicoes";
import * as menu from "./utils/utils-menu/utilsMenu";
import inquirer from "inquirer";
import { centerText } from "./utils/utils-menu/utilsAuxiliaresMenu";

// Instância da aplicação
let simplee = new App();

// Linka interações com publicações e perfis
simplee.linkarDados();

async function main() {
  let opcaoAtual: any;
  let usuarioAtual: Perfil | undefined;

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
      } else if (opcaoAtual === 2) { 
        // Login
        usuarioAtual = await simplee.login();
        if (usuarioAtual) {
          let opcaoCamadaDois: any;
          camadaDois: do {
            try {
              // Camada 2: Menu principal
              // Antes de exibir o menu principal, sincroniza os dados
              await simplee.recarregarDados();
              // Atualiza a referência do usuário logado
              usuarioAtual = simplee.buscarPerfilPorNome(usuarioAtual.nome) as Perfil;
              opcaoCamadaDois = await menu.menuPaginaPrincipal(usuarioAtual);
              
              if (opcaoCamadaDois === 1) { 
                // Camada de Publicação: usuário deseja realizar uma publicação
                let opcaoTipoPublicacao: any;
                do {
                  try {
                    opcaoTipoPublicacao = await menu.menuPublicacao();
                    if (opcaoTipoPublicacao === 1) { 
                      // Publicação simples
                      await simplee.recarregarDados();
                      await simplee.fazerPublicacao(usuarioAtual);
                    } else if (opcaoTipoPublicacao === 2) {
                      // Publicação avançada
                      await simplee.recarregarDados();
                      await simplee.fazerPublicacao(usuarioAtual, true);
                    } else if (opcaoTipoPublicacao === 0) {
                      // Voltar da camada de publicação para o menu principal (camada 2)
                      break;
                    } else {
                      console.log("Opção inválida.");
                    }
                  } catch (error) {
                    console.error("Erro no simplee:", error);
                  }
                } while (true);
                continue camadaDois;
              } else if (opcaoCamadaDois === 2) { 
                // Exibir feed e interagir com publicações
                await simplee.recarregarDados();
                let opcaoCamadaFeed: any;
                do {
                  try {
                    opcaoCamadaFeed = await menu.menuFeed(usuarioAtual, simplee);
                    if (opcaoCamadaFeed === 1) {
                      // perquisar perfil pra ver as publicações
                      let perfilSelecionado = await menu.buscarPerfilNormal(simplee, usuarioAtual);
                      if(perfilSelecionado){
                        await exibirPublicacoes(perfilSelecionado, simplee);
                      }
                      
                    } else if (opcaoCamadaFeed === 2) {
                      // Interagir com publicação 
                      //aqui tem que aparece só publicações avançadas  para interagir
                        let publicacaoEscolhida = await simplee.exibirPublicacoesInterativas(simplee.filtrarPublicacoesAvancadas(usuarioAtual));
                        if (publicacaoEscolhida) {
                            await simplee.interagirPublicacao(publicacaoEscolhida, usuarioAtual);
                        } else {
                          console.log("Nenhuma publicação disponível para interação.");
                        }
                    }else if (opcaoCamadaFeed === 3) {
                      // 
                      await simplee.exibirListaPublicacoesCompleto();

                    } else if (opcaoCamadaFeed === 4) {
                      // Ver publicações do user
                      await simplee.exibirListaPublicacoesUser(usuarioAtual);
                      
                    } else if (opcaoCamadaFeed === 0) {
                      // Voltar para o menu principal (camada 2)
                      break;
                    } else if (opcaoCamadaFeed === 5) {
                      //apagar publicação
                      await simplee.exibirPublicacoesParaDeletar(usuarioAtual);
                    } else {
                      console.log("Opção inválida.");
                    }
                  } catch (error) {
                    console.error("Erro no simplee:", error);
                  }
                } while (true);
              } else if (opcaoCamadaDois === 3) { 
                // Aba de amigos
                let opcaoCamadaTres: any;
                do {
                  try {
                    opcaoCamadaTres = await menu.menuAbaAmigos(simplee, usuarioAtual);
                    if (opcaoCamadaTres === 1) {
                      // Adicionar amigo é aqui
                      //o buscar perfil exibe uma aba de pesquisa que mostra os perfis disponiveis para adicionar
                      let usuarioAdicionar : Perfil;
                      usuarioAdicionar  = await menu.buscarPerfilComMenu(simplee,usuarioAtual);
                      if(usuarioAdicionar){
                        simplee.fazerPedidoAmizade(usuarioAtual, usuarioAdicionar);
                      }
                      
                    } else if (opcaoCamadaTres === 2) {
                      //Listar amigos 
                      let perfilAmigoSelecionado = await simplee.exibirAmigosInterativos(usuarioAtual);
                      if(perfilAmigoSelecionado){
                        await exibirPerfilEPublicacoes(perfilAmigoSelecionado, simplee);
                      }
                    } else if (opcaoCamadaTres === 3) {
                      // Ver pedidos de amizade 
                      await simplee.exibirPedidosAmizade(usuarioAtual);
                    } else if (opcaoCamadaTres === 4) {
                      // Remover amigo 
                      await simplee.removerAmigo(usuarioAtual);
                    } else if (opcaoCamadaTres === 0) {
                      // Voltar
                      break;
                    } else {
                      console.log("Opção inválida.");
                    }
                  } catch (error) {
                    console.error("Erro no simplee:", error);
                  }
                } while (true);
              } else if (opcaoCamadaDois === 4) { 
                //camada de configurações do perfil
                let opcaoCamadaQuatro: any;
                do {
                  try {
                    opcaoCamadaQuatro = await menu.menuConfiguracoes();
                    if (opcaoCamadaQuatro === 1) {
                      // Alterar descrição do perfil
                      await simplee.alterarDescricaoPerfil(usuarioAtual);
                    } else if (opcaoCamadaQuatro === 2) {
                      // Alterar senha do perfil
                      await simplee.alterarSenha(usuarioAtual);
                    } else if (opcaoCamadaQuatro === 3) {
                      // Alterar foto/emoji
                      await simplee.alterarFotoPerfil(usuarioAtual);
                    } else if (opcaoCamadaQuatro === 0) {
                      // Voltar
                      break;
                    } else {
                      console.log("Opção inválida.");
                    }
                  } catch (error) {
                    console.error("Erro no simplee:", error);
                  }
                } while (true);
              } else if (opcaoCamadaDois === 5) { 
                // Gerenciar perfis
                let opcaoCamadaQuatro: any;
                do {
                  try {
                    opcaoCamadaQuatro = await menu.menuGerenciarPerfis(simplee);
                    if (opcaoCamadaQuatro === 1) {
                      // Listar perfis
                      await simplee.exibirListaPerfisCompleto();
                    } else if (opcaoCamadaQuatro === 2) {
                      // Desativar perfil 
                      await simplee.alternarStatusPorFiltro(true);
                    } else if (opcaoCamadaQuatro === 3) {
                      // Ativar perfil 
                      await simplee.alternarStatusPorFiltro(false);
                    } else if (opcaoCamadaQuatro === 0) {
                      // oltar
                      break;
                    } else {
                        console.log("Opção inválida.");
                    }
                  } catch (error) {
                    console.error("Erro no simplee:", error);
                  }
                } while (true);
              } else if (opcaoCamadaDois === 6) {
                //criar outro perfil adm
                await simplee.cadastrarUsuario(true);
              } else if (opcaoCamadaDois === 7) {
                
              }
              else if (opcaoCamadaDois === 0) {
                // Voltar para o menu inicial (camada 1)
                break;
              } else {
                console.log("Opção inválida.");
              }
            } catch (error) {
              console.error("Erro no simplee:", error);
            }
          } while (true);
        }
      } else if (opcaoAtual === 0) {
        exibirMensagemCaixa("Obrigado por usar o Simplee! Até a próxima.");
        break;
      } else {
        console.log("Opção inválida.");
      }
    } catch (error) {
      console.error("Erro no simplee:", error);
    }
  } while (true);
}

main();

