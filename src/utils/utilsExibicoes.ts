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
 * Exibe uma publicação bem elaborada dentro de uma caixinha estilizada.
 * @param publicacao - Objeto com os dados da publicação.
 * Exemplo: { autor: string; data: Date; conteudo: string }
 */
export function exibirPublicacaoCaixa(publicacao: { autor: string; data: Date; conteudo: string }): void {
  // Monta as linhas da caixa com cabeçalho, informações e conteúdo
  const header = "PUBLICAÇÃO";
  const info = `Autor: ${publicacao.autor} | Data: ${publicacao.data.toLocaleString()}`;
  const conteudoLinhas = publicacao.conteudo.split('\n');
  const linhas = [header, info, "", ...conteudoLinhas];

  // Calcula a largura máxima das linhas
  const larguraMax = Math.max(...linhas.map(l => l.length));
  const caixaLargura = larguraMax + 2; // espaços laterais internos
  const terminalWidth = getTerminalWidth();
  const padLeft = Math.floor((terminalWidth - (caixaLargura + 2)) / 2);
  const leftPad = ' '.repeat(padLeft);

  // Borda elaborada usando caracteres Unicode
  const topo = leftPad + "╔" + "═".repeat(caixaLargura) + "╗";
  const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
  
  console.log(topo);
  linhas.forEach(linha => {
      // Preenche cada linha para ter a mesma largura
      const padded = linha.padEnd(larguraMax, ' ');
      console.log(leftPad + "║ " + padded + " ║");
  });
  console.log(fundo);
}