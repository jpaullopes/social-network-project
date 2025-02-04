import { gerarId } from "../utils/utils";

export class Interacao {
    private readonly _id: string; //id vai ser incrementado a cada nova interacao, talvez usamos um parametro externo para isso
    private _tipo: string; //tipo de interacao(gostei, não gostei, risos, surpresa) com emojis
    private _perfilAutor: string; //nome perfil do autor da interacao 

    constructor(tipo: string, perfilAutor: string, id: string = '') {
        this._id = id ? id : gerarId();
        this._tipo = tipo;
        this._perfilAutor = perfilAutor;
    }

    //getters e setters
    public get id() : string {
        return this._id;
    }

    public get tipo() : string {
        return this._tipo;
    }

    public get perfilAutor() : string {
        return this._perfilAutor;
    }

    public set perfilAutor(perfilAutor: string) {
        this._perfilAutor = perfilAutor;
    }

    //exibir interacao
    public exibirInteracao() {
        const idLabel = "ID:".padEnd(20);
        const tipoLabel = "Tipo:".padEnd(20);
        const perfilAutorLabel = "Perfil do autor:".padEnd(20);

        console.log(`${idLabel} ${this._id} | ${tipoLabel} ${this._tipo} | ${perfilAutorLabel} ${this._perfilAutor}`);
    }

}