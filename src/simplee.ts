import { App } from "./models/App";
import { Perfil } from "./models/Perfil";
import { exibirMensagemCaixa } from "./utils/utilsExibicoes";
import * as menu from "./utils/utils-menu/utilsMenu";

// Instância da aplicação
let simplee = new App();

async function main() {
  let opcaoAtual: any;
  let usuarioAtual: Perfil | undefined;

  // Camada 1: Menu inicial
  do {
    opcaoAtual = await menu.menuInicial();
    if (opcaoAtual === 1) { 
      // Cadastrar usuário
      await simplee.cadastrarUsuario();
    } else if (opcaoAtual === 2) { 
      // Login
      usuarioAtual = await simplee.login();
      if (usuarioAtual) {
        let opcaoCamadaDois: any;
        camadaDois: do {
          opcaoCamadaDois = await menu.menuPaginaPrincipal(simplee.verificarPerfilAvancado(usuarioAtual));
          
          if (opcaoCamadaDois === 1) { 
            // Camada de Publicação: usuário deseja realizar uma publicação
            let opcaoTipoPublicacao: any;
            do {
              opcaoTipoPublicacao = await menu.menuPublicacao();
              if (opcaoTipoPublicacao === 1) { 
                // Publicação simples
                await simplee.fazerPublicacao(usuarioAtual);
              } else if (opcaoTipoPublicacao === 2) {
                // Publicação avançada
                await simplee.fazerPublicacao(usuarioAtual, true);
              } else if (opcaoTipoPublicacao === 0) {
                // Voltar da camada de publicação para o menu principal (camada 2)
                break;
              } else {
                console.log("Opção inválida.");
              }
            } while (true);
            continue camadaDois;
          } else if (opcaoCamadaDois === 2) { 
            // Exibir feed e interagir com publicações
            let opcaoCamadaFeed: any;
            do {
              opcaoCamadaFeed = await simplee.menuFeed();
              if (opcaoCamadaFeed === 1) {
                // Acessar a camada de filtros no feed
                let camadaFiltrosPublicacao: any;
                do {
                  camadaFiltrosPublicacao = await menu.menuFiltrosFeed();
                  if (camadaFiltrosPublicacao === 1) {
                    // Crescente (Data)
                    //simplee.listarPublicacoes("data", "crescente");
                  } else if (camadaFiltrosPublicacao === 2) {
                    // Decrescente (Data)
                    //simplee.listarPublicacoes("data", "decrescente");
                  } else if (camadaFiltrosPublicacao === 3) {
                    // Crescente (Interações)
                    //simplee.listarPublicacoes("interacoes", "crescente");
                  } else if (camadaFiltrosPublicacao === 4) {
                    // Decrescente (Interações)
                    //simplee.listarPublicacoes("interacoes", "decrescente");
                  } else if (camadaFiltrosPublicacao === 5) {
                    // Exibir Publicações de Amigos
                    //simplee.listarPublicacoes("amigos");
                  } else if (camadaFiltrosPublicacao === 6) {
                    // Somente Publicações Normais
                    //simplee.listarPublicacoes("normais");
                  } else if (camadaFiltrosPublicacao === 7) {
                    // Somente Publicações Avançadas
                    //simplee.listarPublicacoes("avancadas");
                  } else if (camadaFiltrosPublicacao === 0) {
                    // Voltar
                    break;
                  } else {
                    console.log("Opção inválida.");
                  }
                } while (true);
              } else if (opcaoCamadaFeed === 2) {
                // Interagir com publicação (implementar lógica)
              } else if (opcaoCamadaFeed === 0) {
                // Voltar para o menu principal (camada 2)
                break;
              } else {
                console.log("Opção inválida.");
              }
            } while (true);
          } else if (opcaoCamadaDois === 3) { 
            // Aba de amigos
            let opcaoCamadaTres: any;
            do {
              opcaoCamadaTres = await menu.menuAbaAmigos();
              if (opcaoCamadaTres === 1) {
                // Adicionar amigo (implementar a lógica)
              } else if (opcaoCamadaTres === 2) {
                // Listar amigos (implementar a lógica)
              } else if (opcaoCamadaTres === 3) {
                // Ver pedidos de amizade (implementar a lógica)
              } else if (opcaoCamadaTres === 4) {
                // Remover amigo (implementar a lógica)
              } else if (opcaoCamadaTres === 0) {
                // Voltar
                break;
              } else {
                console.log("Opção inválida.");
              }
            } while (true);
          } else if (opcaoCamadaDois === 4) { 
            // Alterar descrição do perfil
            await simplee.alterarDescricaoPerfil(usuarioAtual);
          } else if (opcaoCamadaDois === 5) { 
            // Gerenciar perfis
            let opcaoCamadaQuatro: any;
            do {
              opcaoCamadaQuatro = await menu.menuGerenciarPerfis();
              if (opcaoCamadaQuatro === 1) {
                // Listar perfis
                simplee.listarPerfis();
              } else if (opcaoCamadaQuatro === 2) {
                // Desativar perfil (implementar a lógica)
                simplee.buscarPerfil(); // Exemplo, implementar corretamente
              } else if (opcaoCamadaQuatro === 3) {
                // Ativar perfil (implementar a lógica)
              } else if (opcaoCamadaQuatro === 4) {
                // Pesquisar perfil (implementar a lógica)
              } else if (opcaoCamadaQuatro === 0) {
                // oltar
                break;
              } else {
                  console.log("Opção inválida.");
              }
            } while (true);
          } else if (opcaoCamadaDois === 0) {
            // Voltar para o menu inicial (camada 1)
            break;
          } else {
            console.log("Opção inválida.");
          }
        } while (true);
      }
    } else if (opcaoAtual === 0) {
      exibirMensagemCaixa("Obrigado por usar o Simplee! Até a próxima.");
      break;
    } else {
      console.log("Opção inválida.");
    }
  } while (true);
}

main();