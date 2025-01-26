export class Perfil {
    private readonly _id: string; // readonly para garantir que o ID seja imutável
    private _nome: string;
    private _email: string;
    private _status: string;
    private _amigos: string[]; // Array de Amigos
    private _posts: string[]; // Arrays de Posts --> SUJEITO A ALTERAÇÕES


    constructor(id: string, nome: string, email: string, status: string, amigos: string[], posts: string[]) {
        this._id = id;
        this._nome = nome;
        this._email = email;    
        this._status = status;
        this._amigos = amigos;
        this._posts = posts;
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
    public listarAmigos(): void {
        if (this.amigos.length === 0) {
          console.log('Nenhum Amigo');
        } 
        
        else {
            // Percorre o array de amigos e lista todos
            for (let i: number = 0; i < this.amigos.length; i++) {
                console.log(this.amigos[i]);
            }
        }
    }


    // Método para adicionar postagem no perfil
    public adicionarPostagem(): void {
        // EM DESENVOLVIMENTO
    }


    // Método para listar postagens do perfil
    public listarPostagens(): void {
        // EM DESENVOLVIMENTO
    }
      

    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    get email() {
        return this._email;
    }

    get status() {
        return this._status;
    }

    get amigos() {
        return this._amigos;
    }

    get posts() {
        return this._posts;
    }
}