import { gerarId } from "../utils/utils";

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

    /**
     * Exibe esta publicação bem elaborada dentro de uma caixinha estilizada.
     */
    public exibirPublicacao(): void {
      // Acesse a função getTerminalWidth (ajuste a importação conforme necessário)
      const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
      
      const header = "PUBLICAÇÃO";
      const info = `Autor: ${this._perfilDoAutor} | Data: ${this._dataDePublicacao.toLocaleString()}`;
      const conteudoLinhas = this._conteudo.split('\n');
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
          const padded = linha.padEnd(larguraMax, ' ');
          console.log(leftPad + "║ " + padded + " ║");
      });
      console.log(fundo);
    }
}