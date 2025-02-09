import inquirer from 'inquirer';
import { clearConsole } from '../utils';
import { gerarBorda, generalizarMenus, gerarBordaDeErro, chalk, displayHeader, centerText } from './utilsAuxiliaresMenu';
import { Perfil } from '../../models/Perfil';
import { PublicacaoAvancada } from '../../models/PublicacaoAvancada';
import { App } from '../../models/App';
import { opcaoVoltar } from "../../utils/utilsExibicoes";

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
export async function menuPaginaPrincipal(perfil: Perfil) {
  try {
    const titulo = perfil.tipo == 'pa' ? 'REDE SOCIAL ADMINISTRADOR' : 'REDE SOCIAL';
    const estadoPerfil = perfil.status;
    displayHeader(titulo);
    console.log(perfil.exibirPerfilFormatado());

    let opcoes = [
      { name: centerText('Realizar Publicação'), value: 1 },
      { name: centerText('Feed'), value: 2 },
      { name: centerText('Aba Amigos'), value: 3 },
      {name: centerText('Configurações'), value: 4 },
      { name: centerText('Sair'), value: 0 },
    ];

    if (perfil.tipo == 'pa') {
      opcoes = [
        { name: centerText('Realizar Publicação'), value: 1 },
        { name: centerText('Feed'), value: 2 },
        { name: centerText('Aba Amigos'), value: 3 },
        { name: centerText('Configurações'), value: 4 },
        { name: centerText('Gerenciar Perfis'), value: 5 },
        { name: centerText('Adicionar Conta ADM'), value: 6 },
        { name: centerText('Sair'), value: 0 },
      ];
    }
    //caso o perfil esteja com status false, então ele vai estar desativado e vai ter esse menu
    if (estadoPerfil == false) {
      opcoes = [
        { name: centerText('Feed'), value: 2 },
        { name: centerText('Aba Amigos'), value: 3 },
        { name: centerText('Sair'), value: 0 },
      ];
    }

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
    console.error(chalk.red("Erro no menuPaginaPrincipal:"), error);
    return null;
  }
}

/**
 * Exibe o menu de interações com emojis e retorna a opção escolhida.
 */
export async function menuInteracoes(publicacao : PublicacaoAvancada) {
  try {
    displayHeader('INTERAÇÕES');
    console.log(publicacao.exibirPublicacao());
    //para publicação exibir suaa interacao
    publicacao.getInteracoes().forEach(interacao  => {
      interacao.exibirInteracaoFormatada();
    });

    const opcoes = [
      { name: centerText('Curtir: 👍'), value: 1 },
      { name: centerText('Não Curtir: 👎'), value: 2 },
      { name: centerText('Risos: 😂'), value: 3 },
      { name: centerText('Surpresa: 😲'), value: 4 },
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
export async function menuAbaAmigos(app : App , usuarioAtual : Perfil) {
  try {
    displayHeader('ABA AMIGOS');
    let opcoes = [
      { name: centerText('Adicionar Amigo'), value: 1 },
      { name: centerText('Lista de Amigos'), value: 2 },
      { name: centerText('Ver Pedidos de Amizade'), value: 3 },
      { name: centerText('Remover Amigo'), value: 4 },
      { name: centerText('Voltar'), value: 0 },
    ]; 

    //pra verificar se perfil tá desativado
    if(usuarioAtual.status == false){
      opcoes = [
        { name: centerText('Lista de Amigos'), value: 2 },
        { name: centerText('Voltar'), value: 0 },
      ]; 
    }

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
export async function menuGerenciarPerfis(app : App) {
  try {
    displayHeader('GERENCIAR PERFIS');
    
    const opcoes = [
      { name: centerText('Exibir Perfis'), value: 1 },
      { name: centerText('Desativar Perfil'), value: 2 },
      { name: centerText('Ativar Perfil'), value: 3 },
      { name: centerText('Voltar'), value: 0 },
    ];

    //app.listarPerfisCompleto();

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
export async function buscarPerfil(perfis: Perfil[], usuarioAtual: Perfil, amigos : boolean = false): Promise<string | null> {
  
  displayHeader('BUSCAR PERFIL');
  // Solicita que o usuário informe um termo para pesquisar
  const { searchTerm } = await inquirer.prompt([
    {
      type: 'input',
      name: 'searchTerm',
      message: centerText('Digite o termo de pesquisa:'),
    }
  ]);
  
  // Filtra os perfis que contenham o termo pesquisado (case-insensitive)
  let perfisFiltrados = perfis.filter(perfil =>
    perfil.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Se o parâmetro amigos for true, aplica filtros adicionais
  if (amigos) {
    perfisFiltrados = perfisFiltrados.filter(perfil =>
      perfil.nome !== usuarioAtual.nome &&
      !usuarioAtual.amigos.includes(perfil.nome) &&
      !perfil.pedidosAmizade.includes(usuarioAtual.nome)
    );
  }
  
  if (perfisFiltrados.length === 0) {
    console.log(centerText("Nenhum perfil encontrado para a pesquisa."));
    return null;
  }
  
  // Mapeia os perfis filtrados para opções de seleção
  const choices = perfisFiltrados.map(perfil => ({
    name: perfil.exibirComoAmigo(),
    value: perfil.nome
  }));
  
  // Adiciona a opção "Voltar"
  choices.push({ name: opcaoVoltar().name, value: "" });
  
  // Exibe o menu de seleção dos perfis encontrados
  const { perfilEscolhido } = await inquirer.prompt([
    {
      name: 'perfilEscolhido',
      type: 'list',
      message: centerText("Selecione um perfil:"),
      choices,
      loop: true,
      pageSize: 20
    }
  ]);
  
  return perfilEscolhido;
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

export async function menuFeed(perfilAtual : Perfil, app : App) {
  try {
    displayHeader('FEED');
    const statusPerfil = perfilAtual.status;
    
    let opcoes = [
      { name: centerText('Exibir Publicações'), value: 3 },
      { name: centerText('Exibir Minhas Publicações'), value: 4 },
      { name: centerText('Pesquisar Perfil'), value: 1 },
      { name: centerText('Interagir com Publicações'), value: 2 },
      { name: centerText('Voltar'), value: 0 },
    ];

    if(statusPerfil == false){
      opcoes = [
        { name: centerText('Pesquisar Perfil'), value: 1 },
        { name: centerText('Voltar'), value: 0 },
      ];
    }

    //exibir publicações
    //app.listarPublicacoes();

    const resposta = await generalizarMenus(opcoes);
    return resposta;
  } catch (error) {
    console.error("Erro no menuFeed:", error);
    return null;
  }
}

export async function menuConfiguracoes(): Promise<number> {
  displayHeader('CONFIGURAÇÕES');

  const opcoes = [
    { name: centerText("Mudar Descrição"), value: 1 },
    { name: centerText("Mudar Senha"), value: 2 },
    { name: centerText("Mudar Imagem do Perfil"), value: 3 },
    { name: centerText("Voltar"), value: 0 }
  ];

  const { opcao } = await inquirer.prompt([
    {
      name: "opcao",
      type: "list",
      message: centerText("Configurações:"),
      choices: opcoes,
    }
  ]);
  return opcao;
}

//modifique a função buscarPerfil para retornar o nome selecionado diretamente
export async function buscarPerfilComMenu(app : App , usuarioAtual : Perfil): Promise<Perfil> {
  //só retorna os perfis que o suario ainda não é amigo
  const nomeSelecionado : any = await buscarPerfil(app.getPerfis(), usuarioAtual, true);
  const perfil : any = app.buscarPerfilPorNome(nomeSelecionado);
  return perfil;
}

export async function buscarPerfilNormal(app : App , usuarioAtual : Perfil): Promise<Perfil> {
  //só retorna os perfis que o suario ainda não é amigo
  //filtragem para excluir o proprio perfil
  let perfis = app.getPerfis().filter(perfil => perfil.nome !== usuarioAtual.nome);
  const nomeSelecionado : any = await buscarPerfil(perfis, usuarioAtual);
  const perfil : any = app.buscarPerfilPorNome(nomeSelecionado);
  return perfil;
}  
