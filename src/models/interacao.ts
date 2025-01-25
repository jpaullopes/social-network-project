class Interacao{
    private _id: number; //id vai ser incrementado a cada nova interacao, talvez usamos um parametro externo para isso
    private _tipo: string; //tipo de interacao(gostei, não gostei, risos, surpresa)
    private _perfilAutor: string; //nome perfil do autor da interacao 

    constructor(id: number, tipo: string, perfilAutor: string) {
        this._id = id;
        this._tipo = tipo;
        this._perfilAutor = perfilAutor;
    }

    //getters e setters
    get id() : number {
        return this._id;
    }

    get tipo() : string {
        return this._tipo;
    }

    get perfilAutor() : string {
        return this._perfilAutor;
    }

    set perfilAutor(perfilAutor: string) {
        this._perfilAutor = perfilAutor;
    }

    //exibir interacao
    exibirInteracao() {
        console.log(`ID: ${this._id} | Tipo: ${this._tipo} | Perfil do autor: ${this._perfilAutor}`);
    }


}