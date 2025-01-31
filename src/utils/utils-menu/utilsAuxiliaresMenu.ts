import cfonts from 'cfonts';
import inquirer from 'inquirer';

// Função para calcular o larguraTerminal adequado da borda
export function gerarBorda(): string {
  //detecta a largura do terminal
  let larguraTerminal = process.stdout.columns;
  return '='.repeat(larguraTerminal);
  
}

//função que retorna o logo da SIMPLEE
export function exibirLogo(): void {
    cfonts.say("SIMPLEE", { //logo
        font: 'block',          // Estilo da fonte
      align: 'center',       // Alinhamento centralizado
      colors: ['cyan', 'white',], // Cores do texto
      letterSpacing: 1,      // Espaçamento entre as letras
      lineHeight: 1,         // Altura da linha
      // Não definindo o fundo, o terminal usará o fundo padrão
      });
}

export function GerarTituloCentralizado(titulo: string){
    // Detectando a largura do terminal
    const larguraTerminal = process.stdout.columns;
    // Criando as bordas com base na largura do terminal
    gerarBorda();
    const espacoTitulo = Math.floor((larguraTerminal - titulo.length) / 2); // Espaço para centralizar o título 
    //titulo centralizado
    const tituloCentralizado = ' '.repeat(espacoTitulo) + titulo;
    return tituloCentralizado;
}


export function exibiçãoDeTitulo(titulo: string): void {
  // gerando borda e titulo centralizado
  console.log(gerarBorda());
  console.log(GerarTituloCentralizado(titulo));
  console.log(gerarBorda());
}

//função que generaliza a escolha de menu
//vai facilitar muita minha vida
export function generalizarMenus(options : Array<{name: string, value: number}>, titulo: string): Promise<number> {
    return new Promise(async (resolve, reject) => {
        exibiçãoDeTitulo(titulo);
        // Exibindo o prompt para o menu interativo
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção:',
                choices: options,
            },
        ]);
        //Retornando a escolha do usuario
        resolve(resposta.opcao);
    });
}