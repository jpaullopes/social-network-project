import { clearConsole } from "./utils";
import { getTerminalWidth } from "./utils-menu/utilsAuxiliaresMenu";

/**
 * Exibe uma mensagem dentro de uma caixinha desenhada com caracteres Unicode.
 * @param mensagem - A mensagem a ser exibida.
 */
export function exibirMensagemCaixa(mensagem: string): void {
    clearConsole();
    const terminalWidth = getTerminalWidth();
    const linhas = mensagem.split('\n');
    const larguraMax = Math.max(...linhas.map(l => l.length));
    const caixaLargura = larguraMax + 4; // bordas e espaços
    const padLeft = Math.floor((terminalWidth - caixaLargura) / 2);
    const leftPad = ' '.repeat(padLeft);
  
    const topo = leftPad + '┌' + '─'.repeat(larguraMax + 2) + '┐';
    const fundo = leftPad + '└' + '─'.repeat(larguraMax + 2) + '┘';
    
    console.log(topo);
    linhas.forEach(linha => {
        const conteudo = ' ' + linha.padEnd(larguraMax, ' ') + ' ';
        console.log(leftPad + '│' + conteudo + '│');
    });
    console.log(fundo);
  }
  /**
   * Quebra o texto em linhas com base na largura máxima especificada.
   * Trata palavras muito grandes dividindo-as em partes.
   * @param text - Texto a ser quebrado.
   * @param maxWidth - Largura máxima permitida em cada linha.
   * @returns {string[]} Array de linhas quebradas.
   */
  export function wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxWidth) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  }

/**
 * Embaralha o conteúdo para exibição na box.
 * Neste exemplo, utiliza a mesma lógica de wrapText.
 */
export function wrapContentToBox(text: string, maxWidth: number): string[] {
  return wrapText(text, maxWidth);
}