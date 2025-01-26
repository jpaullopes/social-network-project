export class Publicacao{
    private _id: string;
    private _conteudo: string;
    private _dataDePublicacao: Date;
    private _perfilDoAutor: string;
    
    // construtor para inicializar os atributos
    constructor (id: string, conteudo: string, perfilDoAutor: string, dataDePublicacao: Date = new Date()){
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
}