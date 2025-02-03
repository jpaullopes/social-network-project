"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
const utils_1 = require("../utils/utils");
class Perfil {
    constructor(nome, email, senha, foto) {
        this._id = (0, utils_1.gerarId)();
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._status = true; // Status padrão é 'ativo' : true
        this._amigos = [];
        this._posts = [];
        this._descricao = "";
        this._fotoPerfil = '👤';
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
        return this.amigos;
    }
    // Setter que pode ser usado pela classe PerfilAvancado para modificar o status dos perfis
    setStatus(novoStatus) {
        this._status = novoStatus;
    }
    // Método para adicionar postagem no perfil
    adicionarPostagem(post) {
        this._posts.push(post.conteudo);
    }
    // Método para listar postagens do perfil
    listarPostagens() {
        return this._posts;
    }
    //metodo para alterar a foto de perfil
    alterarFotoPerfil(novaFoto) {
        this._fotoPerfil = novaFoto;
    }
    get fotoPerfil() {
        return this._fotoPerfil;
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
    get foto() {
        return this._foto;
    }
}
exports.Perfil = Perfil;
