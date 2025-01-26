import { gerarId } from "../utils/utils";

export class Publicacao{
    private _id: string;
    private _conteudo: string;
    private _dataDePublicacao: Date;
    private _perfilDoAutor: string;
    
    // construtor para inicializar os atributos
    constructor (conteudo: string, perfilDoAutor: string, dataDePublicacao: Date = new Date(), id : string = gerarId()){
        this._id = id; // sujeito a mudanças no jeito de setar o id
        this._conteudo = conteudo;
        this._dataDePublicacao = dataDePublicacao;
        this._perfilDoAutor = perfilDoAutor;
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
    public set dataDePublicacao(dataDePublicacao: Date){
        this._dataDePublicacao = dataDePublicacao;
    }

    //função que exibe a publicação
    public exibirPublicacao(){
        console.log(`ID: ${this._id}`);
        console.log(`Conteúdo: ${this._conteudo}`);
        console.log(`Data de publicação: ${this._dataDePublicacao}`);
        console.log(`Perfil do autor: ${this._perfilDoAutor}`);
    }
}