import inquirer from 'inquirer';
import { clearConsole } from '../utils';
import { gerarBorda, exibirLogo, generalizarMenus, gerarBordaDeErro, chalk } from './utilsAuxiliaresMenu';

// Função para exibir o menu inicial
export async function menuInicial() {
  // Limpando o console
  clearConsole();
  // Definindo as opções do menu
  const opcoes = [
    { name: 'Criar Perfil', value: 1 },
    { name: 'Acessar Conta', value: 2 },
    { name: 'Sair', value: 3 },
  ];
  
  // Exibindo o cabeçalho com a gerarBorda() ajustada
  console.log(gerarBorda());
  exibirLogo(); // Exibindo o logo
  console.log(gerarBorda());

  // Exibindo o prompt para o menu interativo
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: opcoes,
    },
  ]);

  //Retornando a escolha do usuario
  return resposta.opcao;
}

//menu referente ao menu principla da rede social

export async function menuPaginaPrincipal(adm: boolean) {
  // Limpando o console
  clearConsole();
  //para centralizar o titulo
  let titulo = 'REDE SOCIAL';
  let opcoes = [
    { name: 'Realizar Publicação', value: 1 },
    { name: 'Feed', value: 2 },
    { name: 'Aba Amigos', value: 3 },
    { name: 'Alterar Descrição Perfil', value: 4 },
    { name: 'Sair', value: 0 },
  ];
  if(adm){ //caso seja adm as opções são aumentadas 
    /**[4] GERENCIAR PERFIS
     [5] ADICIONAR CONTA ADM */
     titulo = 'REDE SOCIAL ADMINISTRADOR';
     opcoes = [
      { name: 'Realizar Publicação', value: 1 },
      { name: 'Feed', value: 2 },
      { name: 'Aba Amigos', value: 3 },
      { name: 'Alterar Descrição Perfil', value: 4 },
      { name: 'Gerenciar Perfis', value: 5 },
      { name: 'Adicionar Conta ADM', value: 6 },
      { name: 'Sair', value: 0 },
    ];
   
    const resposata = await generalizarMenus(opcoes, titulo);
    return resposata;
  }
}

//menu de interações com emojis
export async function menuInteracoes() {
  // Limpando o console
  clearConsole();
  // Definindo o título e as opções
  const titulo = 'INTERAÇÕES';
  const opcoes = [
    { name: 'Curtir: 👍', value: 1 },
    { name: 'Não Curtir: 👎', value: 2 },
    { name: 'Risos: 😂', value: 3 },
    { name: 'Surpresa: 😲', value: 4 },
    { name: 'Adicionar Amigo', value: 5 },
    { name: 'Voltar', value: 0 },
  ];

  const resposta = await generalizarMenus(opcoes, titulo);
  return resposta;
}

//menu da aba de amigos
export async function menuAbaAmigos() {
  // Limpando o console
  clearConsole();

  // Definindo o título e as opções
  const titulo = 'ABA AMIGOS';
  const opcoes = [
    { name: 'Adicionar Amigo', value: 1 },
    { name: 'Lista de Amigos', value: 2 },
    { name: 'Ver Pedidos de Amizade', value: 3 },
    { name: 'Voltar', value: 0 },
  ];

  const resposta = await generalizarMenus(opcoes, titulo);
  return resposta;
}

//menu para gerenciar perfis
export async function menuGerenciarPerfis() {
  // Limpando o console
  clearConsole();

  // Definindo o título e as opções
  const titulo = 'GERENCIAR PERFIS';
  const opcoes = [
    { name: 'Exibir Perfis', value: 1 },
    { name: 'Desativar Perfil', value: 2 },
    { name: 'Ativar Perfil', value: 3 },
    { name: 'Pesquisar (Nome)', value: 4 },
    { name: 'Voltar', value: 0 },
  ];

  const resposta = await generalizarMenus(opcoes, titulo);
  return resposta;
}


//função que vai ser responsável pela pesquisa de perfis
//sujeito a muitas mudanças em decorrência do array de perfis
export async function buscarPerfil(perfis: Array<{ id: number, nome: string }>) { //isso aqui vai depender do rray de perfis
  while(true){ //inicia o loob de busca e já manda uma pergunta
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "pesquisa",
        message: "Digite o nome do perfil para busca (ou digite 'sair' para encerrar):",
      },
    ]);

    const pesquisa = resposta.pesquisa.toLowerCase(); //coloca tudo em minúsculo pra não ter problema

    if (pesquisa === 'sair') { //caso sair seja digitado
      console.log("Encerrando a busca.");
      break;
    }
    // Filtra os perfis com base na pesquisa 
    //PARTE SUJEITA A MUDANÇAS DEVIDO AO ARRAY DE PERFIS
    const resultados = perfis.filter(perfil =>
      perfil.nome.toLowerCase().includes(pesquisa)
    );

    if (resultados.length === 0) { //nenhum nome foi encontrado
      console.log("Nenhum perfil encontrado.");
      continue;
    }
    // Cria uma lista de nomes para selecionar
    const escolhas = resultados.map(perfil => perfil.nome); //parte também sujeita a mudanças em decorrência do array de perfis E VAI TER QUE TER FOTO DE PERFIL
    escolhas.push('Sair'); // adiciona sair na lista de escolhas

    const { escolha } = await inquirer.prompt([
      {
        type: "list",
        name: "escolha",
        message: "Selecione um perfil ou escolha 'Sair' para encerrar:",
        choices: escolhas
      }
    ]);

    if (escolha === 'Sair') {
      console.log("Encerrando a busca.");
      break;
    }

    return escolha; //retorna o nome do perfil escolhido
  }
}

//filtros feed
export async function menuFiltrosFeed() {
  // Limpando o console
  clearConsole();

  // Definindo o título e as opções
  const titulo = 'FILTROS';
  const opcoes = [
    { name: 'Crescente (Data)', value: 1 },
    { name: 'Decrescente (Data)', value: 2 },
    { name: 'Crescente (Interacoes)', value: 3 },
    { name: 'Decrescente (Interacoes)', value: 4 },
    { name: 'Exibir Publicações de Amigos', value: 5 },
    { name: 'Somente Publicações Normais', value: 6 },
    { name: 'Somente Publicações Avançadas', value: 7 },
    { name: 'Voltar', value: 0 },
  ];

  const resposta = await generalizarMenus(opcoes, titulo);
  return resposta;
}

//menu de publicação
export function menuPublicacao(){
  clearConsole();
  const titulo = 'PUBLICAR';
  const opcoes = [
    { name: 'Publicação Simples', value: 1 },
    { name: 'Publicação Avançada', value: 2 },
    { name: 'Voltar', value: 0 },
  ];

  const resposta = generalizarMenus(opcoes, titulo);
  return resposta;
}

//mensagem de erro
/**MENSAGEM DE ERRO
--------------------
[1] TENTAR NOVAMENTE
[2] VOLTAR MENU INICIAL */

export async function mensagemErro(){
  clearConsole();
  const titulo = chalk.red('ERROR'); //titulo de mensagem de erro
  const larguraTerminal = process.stdout.columns;
  const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título 
  //titulo centralizado
  const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
  console.log(gerarBordaDeErro());
  console.log(tituloCentralizado);
  console.log(gerarBordaDeErro());
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: [
        { name: 'Tentar Novamente', value: 1 },
        { name: 'Voltar Menu Inicial', value: 2 },
      ],
    }]);

  return resposta.opcao;
}