import { gerarId } from "../utils/utils";
import { Emoji } from "../types/Emoji";

export class Interacao {
    private readonly _id: string; //id vai ser incrementado a cada nova interacao, talvez usamos um parametro externo para isso
    private _tipo: Emoji; //tipo de interacao(gostei, não gostei, risos, surpresa) com emojis
    private _idPublicacao: string; //id da publicacao que recebeu a interacao
    private _autorPublicacao: string;//manos, passando raído aqui pra faalar que a gente se esqueceu do autor da interacao kkk


    constructor(tipo: Emoji, idPublicacao: string, autorPublicacao: string ,id?: string) {
        this._id = id ? id : gerarId();
        this._tipo = tipo;
        this._idPublicacao = idPublicacao;
        this._autorPublicacao = autorPublicacao;
    }

    //getters e setters
    public get id() : string {
        return this._id;
    }

    public get tipo() : Emoji {
        return this._tipo;
    }

    public get idPublicacao() : string {
        return this._idPublicacao;
    }

    public get autorPublicacao() : string {
        return this._autorPublicacao;
    } 

    public set idPublicacao(idPublicacao: string) {
        this._idPublicacao = idPublicacao;
    }

    public set autorPublicacao(autorPublicacao : string){
        this._autorPublicacao = autorPublicacao;
    }

    //exibir interacao
    public exibirInteracao() {
        const idLabel = "ID:".padEnd(20);
        const tipoLabel = "Tipo:".padEnd(20);
        const perfilAutorLabel = "Perfil do autor:".padEnd(20);

        console.log(`${idLabel} ${this._id} | ${tipoLabel} ${this._tipo} | ${perfilAutorLabel} ${this._idPublicacao}`);
    }

    // Exibe a interação em uma caixa formatada
    public exibirInteracaoFormatada(): void {
        const { getTerminalWidth } = require("../utils/utils-menu/utilsAuxiliaresMenu");
        const terminalWidth: number = getTerminalWidth();
        const boxWidth = 50; // largura fixa para o box
        const header = "INTERAÇÃO";
        const topBorder = "╔" + "═".repeat(boxWidth) + "╗";
        const bottomBorder = "╚" + "═".repeat(boxWidth) + "╝";
        
        const content = [
          `ID: ${this._id} Autor: ${this._autorPublicacao}`,
          `Publicação: ${this._idPublicacao} Tipo: ${this._tipo}`,
        ];
        const padLeft = ' '.repeat(Math.floor((terminalWidth - (boxWidth + 2)) / 2));
        console.log(padLeft + topBorder);
        console.log(padLeft + "║" + header.padStart((boxWidth + header.length) / 2, " ").padEnd(boxWidth, " ") + "║");
        console.log(padLeft + "╟" + "─".repeat(boxWidth) + "╢");
        content.forEach(line => {
            const extraRight = line.startsWith("Publicação") ? "" : "";
          console.log(padLeft + "║" + line.padEnd(boxWidth, " ") +  extraRight + "║");
        });
        console.log(padLeft + bottomBorder);
    }

}