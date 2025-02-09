import { Publicacao } from "./Publicacao";
import { Interacao } from "./Interacao";
import { gerarId } from "../utils/utils";
// Importa a função wrapText da utilsExibicoes
import { wrapText, wrapContentToBox } from "../utils/utilsExibicoes";

export class PublicacaoAvancada extends Publicacao {
    private _listaDeInteracao: Interacao[];

    constructor (conteudo: string, perfilDoAutor: string, listaDeInteracao: Interacao[] = [], tipo : string = 'pa', dataDePublicacao: Date = new Date(), id : string = gerarId()
    ){

        super(conteudo, perfilDoAutor, tipo ,dataDePublicacao, id)// Chamada ao construtor da classe base
        this._listaDeInteracao = listaDeInteracao;
    }

    public adicionarInteracao(interacao: Interacao){
        this._listaDeInteracao.push(interacao);
    }
    
    public listarInteracoes(){
        for (let interacao of this._listaDeInteracao){
            interacao.exibirInteracao();
        }
    }

    //retorna o array de interações
    public getInteracoes(): Interacao[]{
        return this._listaDeInteracao;
    }

    /**
     * Exibe esta publicação avançada em uma caixinha estilizada com reações.
     */
    public override exibirPublicacao(): void {
      const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
      const terminalWidth = getTerminalWidth();
      // Tamanho fixo da caixa: 80% do terminal, com mínimo de 40 colunas
      const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);

      const header = "PUBLICAÇÃO AVANÇADA";
      const dataFormatada = new Date(this.dataDePublicacao).toLocaleString("pt-BR");
      const info = `Autor: ${this.perfilDoAutor} | Data: ${dataFormatada}`;

      // Quebra cada parte usando o tamanho fixo
      const wrappedHeader = wrapText(header, fixedInnerWidth);
      const wrappedInfo = wrapText(info, fixedInnerWidth);
      const wrappedContent = wrapContentToBox(this.conteudo, fixedInnerWidth);

      // Processa reações
      const reactCount: { [key: string]: number } = { '👍': 0, '👎': 0, '😂': 0, '😲': 0 };
      this._listaDeInteracao.forEach(interacao => {
        if (reactCount.hasOwnProperty(interacao.tipo)) {
          reactCount[interacao.tipo]++;
        } else {
          reactCount[interacao.tipo] = 1;
        }
      });
      const reactStrFull = `Reações: ${Object.entries(reactCount)
                                .map(([emoji, count]) => `${emoji} ${count}`)
                                .join(' | ')}`;
      const wrappedReact = wrapText(reactStrFull, fixedInnerWidth);

      // Junta as linhas da caixa
      const linhas = [
        ...wrappedHeader,
        ...wrappedInfo,
        "",
        ...wrappedContent,
        "",
        ...wrappedReact
      ];

      const caixaLargura = fixedInnerWidth;
      const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
      const leftPad = ' '.repeat(padLeft);

      const topo = leftPad + "╔" + "═".repeat(caixaLargura) + "╗";
      const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";

      console.log(topo);
      linhas.forEach(linha => {
          const padded = linha.padEnd(caixaLargura, ' ');
          // Removidos espaços extras entre a borda e o conteúdo
          const rightExtra = wrappedReact.includes(linha) ? "" : "";
          console.log(leftPad + "║" + padded + rightExtra + "║");
      });
      console.log(fundo);
    }

    public override getExibicaoFormatada(exibindo: boolean = false): string {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth = getTerminalWidth();
        const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);
        const header = "PUBLICAÇÃO AVANÇADA";
        const dataFormatada = new Date(this.dataDePublicacao).toLocaleString("pt-BR");
        const info = `Autor: ${this.perfilDoAutor} | Data: ${dataFormatada}`;
        const wrappedHeader = wrapText(header, fixedInnerWidth);
        const wrappedInfo = wrapText(info, fixedInnerWidth);
        const wrappedContent = wrapContentToBox(this.conteudo, fixedInnerWidth);
        // Processa reações
        const reactCount: { [key: string]: number } = { '👍': 0, '👎': 0, '😂': 0, '😲': 0 };
        this._listaDeInteracao.forEach(interacao => {
            if (reactCount.hasOwnProperty(interacao.tipo)) {
                reactCount[interacao.tipo]++;
            } else {
                reactCount[interacao.tipo] = 1;
            }
        });
        const reactStrFull = `Reações: ${Object.entries(reactCount)
            .map(([emoji, count]) => `${emoji} ${count}`)
            .join(' | ')}`;
        const wrappedReact = wrapText(reactStrFull, fixedInnerWidth);
        const linhas = [
            ...wrappedHeader,
            ...wrappedInfo,
            "",
            ...wrappedContent,
            "",
            ...wrappedReact
        ];
        const caixaLargura = fixedInnerWidth;
        const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
        const leftPad = ' '.repeat(padLeft);
        let menos = exibindo ? 2 : 0;
        const topo = ' '.repeat(padLeft - menos) + "╔" + "═".repeat(caixaLargura) + "╗";
        if(exibindo){
          const topo = ' '.repeat(padLeft) + "╔" + "═".repeat(caixaLargura) + "╗";
        }
        const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
        let box = topo + "\n";
        linhas.forEach(linha => {
          const rightExtra = wrappedReact.includes(linha) ? "" : "";
          box += leftPad + "║" + linha.padEnd(caixaLargura, ' ') + rightExtra + "║\n";
        });
        box += fundo;
        return box;
    }
}