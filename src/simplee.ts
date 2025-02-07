import { App } from "./models/App";
import * as menu from "./utils/utils-menu/utilsMenu";

// Instância da aplicação
let simplee = new App();

async function main() {
  let opcaoAtual: any;
  let usuarioAtual: any;

  // Menu principal - camada 1
  do {
    opcaoAtual = await menu.menuInicial();
    if (opcaoAtual === 1) { 
      // Cadastrar usuário
      await simplee.cadastrarUsuario();
    } else if (opcaoAtual === 2) { 
      // Login
      usuarioAtual = await simplee.login();

      // Somente se o login for bem-sucedido, entra na camada 2
      if (usuarioAtual) {
        let opcaoCamadaDois: any;

        // Novo while para a camada 2 (menu principal após login)
        do {
          opcaoCamadaDois = await menu.menuPaginaPrincipal(simplee.buscarPerfilPorNome(usuarioAtual) ? true : false);
          
          if (opcaoCamadaDois === 1) { 
            // Realizar publicação
            let opcaoTipoPublicacao: any;
            // While para camada de publicação
            do {
              opcaoTipoPublicacao = await menu.menuPublicacao();
              if (opcaoTipoPublicacao === 1) {
                // Publicação simples
                await simplee.fazerPublicacao(usuarioAtual);
              } else if (opcaoTipoPublicacao === 2) {
                // Publicação avançada
                await simplee.fazerPublicacao(usuarioAtual, true);
              } else if (opcaoTipoPublicacao === 0) {
                // Voltar
                break;
              } else {
                console.log("Opção inválida.");
              }
            } while (opcaoTipoPublicacao !== 0);
          } else if (opcaoCamadaDois === 2) { 
            // Feed / listar publicações
            simplee.listarPublicacoes();
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
            } while (opcaoCamadaTres !== 0);
          } else if (opcaoCamadaDois === 4) { 
            // Alterar descrição do perfil (implementar a lógica)
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
                // Voltar
                break;
              } else {
                console.log("Opção inválida.");
              }
            } while (opcaoCamadaQuatro !== 0);
          } else if (opcaoCamadaDois === 0) {
            // Voltar para o menu inicial
            break;
          } else {
            console.log("Opção inválida.");
          }
        } while (opcaoCamadaDois !== 0);
      }
    } else if (opcaoAtual === 0) {
      console.log("Saindo da rede social...");
    } else {
      console.log("Opção inválida.");
    }
  } while (opcaoAtual !== 0);
}

main();