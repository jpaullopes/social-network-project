"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
class Perfil {
    constructor(id, nome, email, status, amigos, posts) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._status = status;
        this._amigos = amigos;
        this._posts = posts;
    }
    // Método para adicionar um Amigo --> SUJEITO A ALTERAÇÕES
    adicionarAmigo(nomeAmigo) {
        if (!this._amigos.includes(nomeAmigo)) {
            this._amigos.push(nomeAmigo);
            return true; // Retorna true se amigo adicionado com sucesso
        }
        return false; // Retorna false se amigo já estiver adicionado
    }
    // Método para remover um amigo pelo nome --> SUJEITO A ALTERAÇÕES
    removerAmigo(nomeAmigo) {
        // Percorre o array de amigos até achar um valor que satisfaz a condição
        const index = this._amigos.findIndex((amigo) => amigo === nomeAmigo);
        if (index !== -1) {
            this._amigos.splice(index, 1); // Remove o amigo da lista diretamente
            return true; // Retorna true se o amigo foi removido
        }
        return false; // Retorna false se o amigo não foi encontrado
    }
    // Método para listar amigos --> SUJEITO A ALTERAÇÕES
    listarAmigos() {
        if (this.amigos.length === 0) {
            console.log('Nenhum Amigo');
        }
        else {
            // Percorre o array de amigos e lista todos
            for (let i = 0; i < this.amigos.length; i++) {
                console.log(this.amigos[i]);
            }
        }
    }
    // Método para adicionar postagem no perfil
    adicionarPostagem() {
        // EM DESENVOLVIMENTO
    }
    // Método para listar postagens do perfil
    listarPostagens() {
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
exports.Perfil = Perfil;
