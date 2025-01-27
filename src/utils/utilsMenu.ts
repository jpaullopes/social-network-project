import inquirer from 'inquirer';
import cfonts from 'cfonts';
import { clearConsole } from './utils';

// Função para calcular o tamanho adequado da borda
function gerarBorda(tamanho: number): string {
  return '='.repeat(tamanho);
}

// Função principal para exibir o menu
async function exibirMenu() {
  // Detectando a largura do terminal
  // Detectando a largura do terminal
  const larguraTerminal = process.stdout.columns;

  // Definindo o título e as opções
  const titulo = 'SIMPLEE';
  const opcoes = [
    { name: 'Criar Perfil', value: 1 },
    { name: 'Acessar Conta', value: 2 },
    { name: 'Sair', value: 3 },
  ];
  
  // Criando as bordas com base na largura do terminal
  const borda = gerarBorda(larguraTerminal);
  const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título

  // Exibindo o cabeçalho com a borda ajustada
  console.log(borda);
  cfonts.say(titulo, {
    font: 'block',          // Estilo da fonte
  align: 'center',       // Alinhamento centralizado
  colors: ['cyan', 'white'], // Cores do texto
  letterSpacing: 1,      // Espaçamento entre as letras
  lineHeight: 1,         // Altura da linha
  // Não definindo o fundo, o terminal usará o fundo padrão
  });
  console.log(borda);

  // Exibindo o prompt para o menu interativo
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: opcoes,
    },
  ]);

  // Tratando a resposta
  switch (resposta.opcao) {
    case 1:
      console.log('Você escolheu Criar Perfil');
      break;
    case 2:
      console.log('Você escolheu Acessar Conta');
      break;
    case 3:
      console.log('Saindo...');
      process.exit();
  }
}

clearConsole();

// Chamar a função para exibir o menu
exibirMenu();