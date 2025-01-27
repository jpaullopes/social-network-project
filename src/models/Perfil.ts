import { gerarId } from "../utils/utils";

export class Perfil {
    protected readonly _id: string; // readonly para garantir que o ID seja imutável
    protected _nome: string;
    protected _email: string;
    protected _senha: string;
    protected _status: string;
    protected _amigos: string[]; // Array de Amigos
    protected _posts: string[]; // Arrays de Posts --> SUJEITO A ALTERAÇÕES


    constructor(nome: string, email: string, senha: string) {
        this._id = gerarId();
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._status = 'ativo'; // Status padrão é 'ativo'
        this._amigos = [];
        this._posts = [];
    }


    // Método para adicionar um Amigo --> SUJEITO A ALTERAÇÕES
    public adicionarAmigo(nomeAmigo: string): boolean {
        if (!this._amigos.includes(nomeAmigo)) {
            this._amigos.push(nomeAmigo);

            return true; // Retorna true se amigo adicionado com sucesso
        }
        
        return false; // Retorna false se amigo já estiver adicionado
    }


    // Método para remover um amigo pelo nome --> SUJEITO A ALTERAÇÕES
    public removerAmigo(nomeAmigo: string): boolean {
        // Percorre o array de amigos até achar um valor que satisfaz a condição
        const index = this._amigos.findIndex((amigo) => amigo === nomeAmigo);

        if (index !== -1) {
            this._amigos.splice(index, 1); // Remove o amigo da lista diretamente

            return true; // Retorna true se o amigo foi removido
        }

        return false; // Retorna false se o amigo não foi encontrado
    }
    

    // Método para listar amigos --> SUJEITO A ALTERAÇÕES
    public listarAmigos(): string[] {
        return this.amigos;
    }

    // Setter que pode ser usado pela classe PerfilAvancado para modificar o status dos perfis
    public setStatus(novoStatus: string): void {
        this._status = novoStatus;
    }

    // Método para adicionar postagem no perfil
    public adicionarPostagem(): void {
        // EM DESENVOLVIMENTO
    }


    // Método para listar postagens do perfil
    public listarPostagens(): void {
        // EM DESENVOLVIMENTO
    }

    public get id() {
        return this._id;
    }

    public get nome() {
        return this._nome;
    }

    public get email() {
        return this._email;
    }

    public get status() {
        return this._status;
    }

    public get amigos() {
        return this._amigos;
    }

    public get posts() {
        return this._posts;
    }
}

