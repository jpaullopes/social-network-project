import cfonts from 'cfonts';

// Função para calcular o tamanho adequado da borda
export function gerarBorda(tamanho: number): string {
  return '='.repeat(tamanho);
}

//função que retorna o logo da SIMPLEE
export function exibirLogo(): void {
    cfonts.say("SIMPLEE", { //logo
        font: 'block',          // Estilo da fonte
      align: 'center',       // Alinhamento centralizado
      colors: ['cyan', 'white'], // Cores do texto
      letterSpacing: 1,      // Espaçamento entre as letras
      lineHeight: 1,         // Altura da linha
      // Não definindo o fundo, o terminal usará o fundo padrão
      });
}