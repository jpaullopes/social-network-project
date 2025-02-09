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
            } while (true);
            continue camadaDois;
          } else if (opcaoCamadaDois === 2) { 
            // Exibir feed e interagir com publicações
            await simplee.recarregarDados();
            let opcaoCamadaFeed: any;
            do {
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
            } while (true);
          } else if (opcaoCamadaDois === 4) { 
            //camada de configurações do perfil
            let opcaoCamadaQuatro: any;
            do {
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
            } while (true);
          } else if (opcaoCamadaDois === 5) { 
            // Gerenciar perfis
            let opcaoCamadaQuatro: any;
            do {
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

function buscarPerfilComNome(simplee: App): Perfil {
  throw new Error("Function not implemented.");
}

// Nova função para buscar perfis (exceto o usuário atual) e exibir o perfil com suas publicações
export async function visualizarPerfilEPublicacoes(app: App, usuarioAtual: Perfil): Promise<void> {
    // Obtém todos os perfis exceto o usuário atual
    const perfis = app.getPerfis().filter(p => p.nome !== usuarioAtual.nome);
  
    // Prompt para busca
    const { termoBusca } = await inquirer.prompt([
        { 
            name: "termoBusca", 
            message: "Digite o nome para buscar (ou deixe vazio para listar todos):", 
            type: "input" 
        }
    ]);
  
    const termo = termoBusca.trim().toLowerCase();
    const perfisFiltrados = termo ? perfis.filter(p => p.nome.toLowerCase().includes(termo)) : perfis;
  
    if (perfisFiltrados.length === 0) {
        console.log(centerText("Nenhum perfil encontrado."));
        await inquirer.prompt([{ 
            name: "voltar", 
            message: "Pressione ENTER para voltar.", 
            type: "input" 
        }]);
        return;
    }
  
    // Cria as opções para o menu
    const opcoes : { name: string; value: Perfil | null }[] = perfisFiltrados.map(p => ({
        name: p.exibirPerfilCompleto(), // Exibe o perfil com detalhes
        value: p
    }));
    opcoes.push({ name: getBoxVoltar(), value: null });
  
    const { perfilSelecionado } = await inquirer.prompt<{ perfilSelecionado: Perfil | null }>([
        {
            name: "perfilSelecionado",
            type: "list",
            message: centerText("Selecione um perfil para visualizar suas publicações:"),
            choices: opcoes,
            pageSize: 30
        }
    ]);
  
    if (!perfilSelecionado) return;
  
    // Exibe o perfil selecionado e suas publicações
    console.clear();
    console.log(perfilSelecionado.exibirPerfilCompleto());
    const pubs = app.buscarPublicacoesPorPerfil(perfilSelecionado);
    if (pubs.length === 0) {
        console.log(centerText("Nenhuma publicação encontrada para este perfil."));
    } else {
        pubs.forEach(pub => {
            console.log(pub.getExibicaoFormatada(true));
        });
    }
  
    // Exibe uma box "Voltar" para interação
    await inquirer.prompt([
        {
            name: "voltar",
            type: "list",
            message: centerText("Pressione para voltar:"),
            choices: [{ name: getBoxVoltar(), value: null }],
            pageSize: 10
        }
    ]);
}
