import cfonts from 'cfonts';
import inquirer from 'inquirer';
import { clearConsole } from '../utils';

export const chalk = require('chalk');

/**
 * Retorna a largura do terminal, com fallback para 80 colunas.
 */
function getTerminalWidth(): number {
  return process.stdout.columns || 80;
}

/**
 * Gera uma borda padrão usando o caractere "=".
 * @returns {string} A borda gerada.
 */
export function gerarBorda(): string {
  const larguraTerminal = getTerminalWidth();
  return '='.repeat(larguraTerminal);
}

/**
 * Gera uma borda de erro estilizada usando o caractere "-".
 * @returns {string} A borda de erro gerada.
 */
export function gerarBordaDeErro(): string {
  const larguraTerminal = getTerminalWidth();
  return chalk.red('-'.repeat(larguraTerminal));
}

/**
 * Exibe o logo da SIMPLEE usando o pacote cfonts.
 */
export function exibirLogo(): void {
  try {
    cfonts.say("SIMPLEE", {
      font: 'block',          // Estilo da fonte
      align: 'center',        // Centraliza o logo
      colors: ['cyan', 'white'],
      letterSpacing: 1,       // Espaçamento entre as letras
      lineHeight: 1,          // Altura da linha
    });
  } catch (error) {
    console.error(chalk.red("Erro ao exibir o logo:"), error);
  }
}

/**
 * Exibe um cabeçalho estilizado, com borda, título centralizado e opcional subtítulo.
 * Se o título for "SIMPLEE", exibe também o logo.
 * @param titulo - Texto do título.
 * @param subTitulo - Texto opcional do subtítulo.
 */
export function displayHeader(titulo: string, subTitulo?: string): void {
  clearConsole();
  const borda = gerarBorda();
  console.log(borda);

  if (titulo.toUpperCase() === 'SIMPLEE') {
    exibirLogo();
  }

  const larguraTerminal = getTerminalWidth();
  const tituloFormatado = chalk.bold.blue(titulo.toUpperCase());
  const espacos = ' '.repeat(Math.floor((larguraTerminal - titulo.length) / 2));
  titulo.toUpperCase() === 'SIMPLEE' ? '' : console.log(espacos + tituloFormatado);

  if (subTitulo) {
    const subtituloFormatado = chalk.italic.green(subTitulo);
    const espacosSub = ' '.repeat(Math.floor((larguraTerminal - subTitulo.length) / 2));
    console.log(espacosSub + subtituloFormatado);
  }
  console.log(borda);
}

/**
 * Retorna o título centralizado e estilizado.
 * @param titulo - O texto do título.
 * @returns {string} Título centralizado.
 */
export function exibirTituloCentralizado(titulo: string): string {
  const larguraTerminal = getTerminalWidth();
  const tituloFormatado = chalk.bold.blue(titulo.toUpperCase());
  const espacos = ' '.repeat(Math.floor((larguraTerminal - titulo.length) / 2));
  return espacos + tituloFormatado;
}

/**
 * Exibe um título com bordas acima e abaixo.
 * @param titulo - O texto do título.
 */
export function exibirTitulo(titulo: string): void {
  const borda = gerarBorda();
  console.log(borda);
  console.log(exibirTituloCentralizado(titulo));
  console.log(borda);
}

/**
 * Exibe um menu interativo com as opções fornecidas e retorna a escolha do usuário.
 * @param options - Array de opções, cada uma com um nome e um valor.
 * @returns {Promise<number>} Resolução com o valor escolhido.
 */
export async function generalizarMenus(
  options: Array<{ name: string; value: number }>,
): Promise<number> {
  try {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: chalk.yellow(centerText('Escolha uma opção:')),
        choices: options,
      },
    ]);
    return resposta.opcao;
  } catch (error) {
    console.error(chalk.red("Erro na seleção do menu:"), error);
    throw error;
  }
}
//
function stripAnsi(text: string): string {
    return text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

/**
 * Ajuda a centralizar algumas coisas nas funções, ela serve para auxiliar.
 * @param text - O texto a ser centralizado.
 * @returns {string} Texto centralizado.
 */
export function centerText(text: string): string {
    const terminalWidth = process.stdout.columns || 80;
    // Split text into lines and trim left side for left-alignment.
    const lines = text.split('\n').map(line => line.trimStart());
    // Center each line individually.
    const centeredLines = lines.map(line => {
      const cleanLine = stripAnsi(line);
      const pad = Math.floor((terminalWidth - cleanLine.length) / 2);
      return pad > 0 ? ' '.repeat(pad) + line : line;
    });
    return centeredLines.join('\n');
  }