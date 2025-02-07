import inquirer from 'inquirer';
import { clearConsole } from '../utils';
import { gerarBorda, generalizarMenus, gerarBordaDeErro, chalk, displayHeader, centerText } from './utilsAuxiliaresMenu';
import { Perfil } from '../../models/Perfil';
/**
 * Exibe o menu inicial e retorna a opção escolhida pelo usuário.
 */
export async function menuInicial() : Promise<number | null> {
  try {
    displayHeader('SIMPLEE', 'Bem-vindo ao Sistema de Rede Social');
    
    const opcoes = [
      { name: centerText('Criar Perfil'), value: 1 },
      { name: centerText('Acessar Conta'), value: 2 },
      { name: centerText('Sair'), value: 0 },
    ];

    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: chalk.yellow(centerText('Escolha uma opção:')),
        choices: opcoes,
      },
    ]);

    return resposta.opcao;
  } catch (error) {
    console.error("Erro no menuInicial:", error);
    return null;
  }
}

/**
 * Exibe o menu da página principal da rede social.
 * Se 'adm' for true, exibe opções administrativas extras.
 * @param adm - Indicador se o usuário é administrador.
 */
export async function menuPaginaPrincipal(adm: boolean) {
  try {
    const titulo = adm ? 'REDE SOCIAL ADMINISTRADOR' : 'REDE SOCIAL';
    displayHeader(titulo);
    
    let opcoes = [
      { name: centerText('Realizar Publicação'), value: 1 },
      { name: centerText('Feed'), value: 2 },
      { name: centerText('Aba Amigos'), value: 3 },
      { name: centerText('Alterar Descrição Perfil'), value: 4 },
      { name: centerText('Sair'), value: 0 },
    ];

    opcoes = adm
      ? [
          { name: centerText('Realizar Publicação'), value: 1 },
          { name: centerText('Feed'), value: 2 },
          { name: centerText('Aba Amigos'), value: 3 },
          { name: centerText('Alterar Descrição Perfil'), value: 4 },
          { name: centerText('Gerenciar Perfis'), value: 5 },
          { name: centerText('Adicionar Conta ADM'), value: 6 },
          { name: centerText('Sair'), value: 0 },
        ]
      : opcoes;

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuPaginaPrincipal:", error);
    return null;
  }
}

/**
 * Exibe o menu de interações com emojis e retorna a opção escolhida.
 */
export async function menuInteracoes() {
  try {
    displayHeader('INTERAÇÕES');
    
    const opcoes = [
      { name: centerText('Curtir: 👍'), value: 1 },
      { name: centerText('Não Curtir: 👎'), value: 2 },
      { name: centerText('Risos: 😂'), value: 3 },
      { name: centerText('Surpresa: 😲'), value: 4 },
      { name: centerText('Adicionar Amigo'), value: 5 },
      { name: centerText('Voltar'), value: 0 },
    ];

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuInteracoes:", error);
    return null;
  }
}

/**
 * Exibe o menu da Aba Amigos e retorna a opção escolhida.
 */
export async function menuAbaAmigos() {
  try {
    displayHeader('ABA AMIGOS');
    
    const opcoes = [
      { name: centerText('Adicionar Amigo'), value: 1 },
      { name: centerText('Lista de Amigos'), value: 2 },
      { name: centerText('Ver Pedidos de Amizade'), value: 3 },
      { name: centerText('Remover Amigo'), value: 4 },
      { name: centerText('Voltar'), value: 0 },
    ];

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuAbaAmigos:", error);
    return null;
  }
}

/**
 * Exibe o menu para gerenciar perfis e retorna a opção escolhida.
 */
export async function menuGerenciarPerfis() {
  try {
    displayHeader('GERENCIAR PERFIS');
    
    const opcoes = [
      { name: centerText('Exibir Perfis'), value: 1 },
      { name: centerText('Desativar Perfil'), value: 2 },
      { name: centerText('Ativar Perfil'), value: 3 },
      { name: centerText('Pesquisar (Nome)'), value: 4 },
      { name: centerText('Voltar'), value: 0 },
    ];

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuGerenciarPerfis:", error);
    return null;
  }
}

/**
 * Realiza a busca de perfis com base no nome informado.
 * @param perfis - Array de objetos com informações dos perfis.
 * @returns Retorna o nome do perfil selecionado ou null se sair.
 */
export async function buscarPerfil(perfis: Perfil[]) {
  try {
    while (true) {
      clearConsole();
      console.log(gerarBorda());
      console.log(chalk.bold.magenta(centerText('BUSCA DE PERFIS')));
      console.log(gerarBorda());
      
      const resposta = await inquirer.prompt([
        {
          type: "input",
          name: "pesquisa",
          message: chalk.yellow(centerText("Digite o nome do perfil para busca (ou 'sair' para encerrar):")),
        },
      ]);

      const pesquisa = resposta.pesquisa.toLowerCase();

      if (pesquisa === 'sair') {
        console.log(chalk.red(centerText("Encerrando a busca.")));
        break;
      }

      const resultados = perfis.filter(perfil =>
        perfil.nome.toLowerCase().includes(pesquisa)
      );

      if (resultados.length === 0) {
        console.log(chalk.red(centerText("Nenhum perfil encontrado.")));
        continue;
      }

      const escolhas = resultados.map(perfil => centerText(perfil.nome));
      escolhas.push(centerText('Sair'));

      const { escolha } = await inquirer.prompt([
        {
          type: "list",
          name: "escolha",
          message: chalk.yellow(centerText("Selecione um perfil ou 'Sair':")),
          choices: escolhas,
        },
      ]);

      if (escolha.trim() === 'Sair') {
        console.log(chalk.red(centerText("Encerrando a busca.")));
        break;
      }

      return escolha;
    }
    return null;
  } catch (error) {
    console.error("Erro no buscarPerfil:", error);
    return null;
  }
}

/**
 * Exibe o menu de filtros para o feed e retorna a opção escolhida.
 */
export async function menuFiltrosFeed() {
  try {
    displayHeader('FILTROS');
    
    const opcoes = [
      { name: centerText('Crescente (Data)'), value: 1 },
      { name: centerText('Decrescente (Data)'), value: 2 },
      { name: centerText('Crescente (Interações)'), value: 3 },
      { name: centerText('Decrescente (Interações)'), value: 4 },
      { name: centerText('Exibir Publicações de Amigos'), value: 5 },
      { name: centerText('Somente Publicações Normais'), value: 6 },
      { name: centerText('Somente Publicações Avançadas'), value: 7 },
      { name: centerText('Voltar'), value: 0 },
    ];

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuFiltrosFeed:", error);
    return null;
  }
}

/**
 * Exibe o menu de publicação e retorna a opção escolhida.
 */
export async function menuPublicacao() {
  try {
    displayHeader('PUBLICAR');
    
    const opcoes = [
      { name: centerText('Publicação Simples'), value: 1 },
      { name: centerText('Publicação Avançada'), value: 2 },
      { name: centerText('Voltar'), value: 0 },
    ];

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuPublicacao:", error);
    return null;
  }
}

/**
 * Exibe a mensagem de erro com opções para tentar novamente ou voltar ao menu inicial.
 */
export async function mensagemErro() {
  try {
    clearConsole();
    const bordaErro = gerarBordaDeErro();
    const larguraTerminal = process.stdout.columns || 80;
    const tituloText = 'ERROR';
    const espacoTitulo = ' '.repeat(Math.floor((larguraTerminal - tituloText.length) / 2));
    const tituloFormatado = chalk.red.bold(tituloText);

    console.log(bordaErro);
    console.log(espacoTitulo + tituloFormatado);
    console.log(bordaErro);

    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: chalk.yellow('Escolha uma opção:'),
        choices: [
          { name: centerText('Tentar Novamente'), value: 1 },
          { name: centerText('Voltar Menu Inicial'), value: 2 },
        ],
      },
    ]);

    return resposta.opcao;
  } catch (error) {
    console.error("Erro na mensagemErro:", error);
    return null;
  }
}

/**
 * Exibe o menu de alteração de descrição do perfil.
 */
export async function alterarDescricao() {
  try {
    displayHeader('ALTERAR DESCRIÇÃO');
    
    const resposta = await inquirer.prompt([
      {
        type: 'input',
        name: 'descricao',
        message: chalk.yellow('Digite a nova descrição do perfil:'),
      },
    ]);

    return resposta.descricao;
  } catch (error) {
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

export async function menuFeed() {
  try {
    displayHeader('FEED');
    
    const opcoes = [
      { name: centerText('Filtrar Publicações'), value: 1 },
      { name: centerText('Interagir com Publicações'), value: 2 },
      { name: centerText('Voltar'), value: 0 },
    ];

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuFeed:", error);
    return null;
  }
}