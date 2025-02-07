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

}