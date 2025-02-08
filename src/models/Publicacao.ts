import { gerarId } from "../utils/utils";
// Importa as funções de quebra para caixa
import { wrapText, wrapContentToBox } from "../utils/utilsExibicoes";

export class Publicacao{
    private _id: string;
    private _conteudo: string;
    private _dataDePublicacao: Date;
    private _perfilDoAutor: string;
    private _tipo : string;
    
    // construtor para inicializar os atributos
    constructor (conteudo: string, perfilDoAutor: string, tipo : string = 'ps' , dataDePublicacao: Date = new Date(), id : string = gerarId()){
        this._id = id; // sujeito a mudanças no jeito de setar o id
        this._conteudo = conteudo;
        this._dataDePublicacao = dataDePublicacao;
        this._perfilDoAutor = perfilDoAutor;
        this._tipo = tipo;
    }

    // getters e setters
    public get id(): string{
        return this._id;
    }
    public get conteudo(): string{
        return this._conteudo;
    }
    public get dataDePublicacao(): Date{
        return this._dataDePublicacao;
    }
    public get perfilDoAutor(): string{
        return this._perfilDoAutor;
    }
    public get tipo(): string{
        return this._tipo;
    }
    public set dataDePublicacao(dataDePublicacao: Date){
        this._dataDePublicacao = dataDePublicacao;
    }

    public getExibicaoFormatada(exibicao: boolean = false): string {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth = getTerminalWidth();
        const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);
        const header = "PUBLICAÇÃO";
        const dataFormatada = new Date(this._dataDePublicacao).toLocaleString("pt-BR");
        const info = `Autor: ${this._perfilDoAutor} | Data: ${dataFormatada}`;
        const wrappedHeader = wrapText(header, fixedInnerWidth);
        const wrappedInfo = wrapText(info, fixedInnerWidth);
        const wrappedContent = wrapContentToBox(this._conteudo, fixedInnerWidth);
        const linhas = [
            ...wrappedHeader,
            ...wrappedInfo,
            "",
            ...wrappedContent
        ];
        const caixaLargura = fixedInnerWidth;
        const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
        const leftPad = ' '.repeat(padLeft);
        const topo = leftPad + "╔" + "═".repeat(caixaLargura) + "╗";
        const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";
        let box = topo + "\n";
        linhas.forEach(linha => {
            box += leftPad + "║" + linha.padEnd(caixaLargura, ' ') + "║\n";
        });
        box += fundo;
        return box;
    }

    /**
     * Exibe esta publicação em uma caixa estilizada com tamanho fixo baseado no terminal.
     */
    public exibirPublicacao(): void {
      const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
      const terminalWidth = getTerminalWidth();
      // Define o tamanho fixo da caixa: 80% do terminal, com mínimo de 40 colunas
      const fixedInnerWidth = Math.max(40, Math.floor(terminalWidth * 0.8) - 2);

      const header = "PUBLICAÇÃO";
      const dataFormatada = new Date(this._dataDePublicacao).toLocaleString("pt-BR");
      const info = `Autor: ${this._perfilDoAutor} | Data: ${dataFormatada}`;

      // Quebra cada parte utilizando o tamanho fixo
      const wrappedHeader = wrapText(header, fixedInnerWidth);
      const wrappedInfo = wrapText(info, fixedInnerWidth);
      const wrappedContent = wrapContentToBox(this._conteudo, fixedInnerWidth);

      // Junta as linhas da caixa
      const linhas = [
        ...wrappedHeader,
        ...wrappedInfo,
        "",
        ...wrappedContent
      ];

      const caixaLargura = fixedInnerWidth;
      const padLeft = Math.max(0, Math.floor((terminalWidth - (caixaLargura + 2)) / 2));
      const leftPad = ' '.repeat(padLeft);

      const topo = leftPad + "╔" + "═".repeat(caixaLargura) + "╗";
      const fundo = leftPad + "╚" + "═".repeat(caixaLargura) + "╝";

      console.log(topo);
      linhas.forEach(linha => {
          const padded = linha.padEnd(caixaLargura, ' ');
          console.log(leftPad + "║" + padded + "║");
      });
      console.log(fundo);
    }
}