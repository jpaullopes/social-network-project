"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
const utils_1 = require("../utils/utils");
class Perfil {
    constructor(nome, email, senha, foto = '👤', descricao = "Vazio", tipo = 'ps', id) {
        this._id = id ? id : (0, utils_1.gerarId)();
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._status = true;
        this._amigos = [];
        this._posts = [];
        this._descricao = descricao;
        this._fotoPerfil = foto;
        this._pedidosAmizade = [];
        this._tipo = tipo;
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
    // Método para adicionar pedidos de amizade ao perfil
    adicionarPedidosAmizade(nomeSolicitante) {
        this._pedidosAmizade.push(nomeSolicitante);
    }
    //função que verifica se a senha informada é igual a senha do perfil
    verificarSenha(senha) {
        return this._senha === senha;
    }
    contarAmigos() {
        return this._amigos.length;
    }
    contarPublicacoes() {
        return Array.isArray(this._posts) ? this._posts.length : 0;
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
        return this._fotoPerfil;
    }
    get pedidosAmizade() {
        return this._pedidosAmizade;
    }
    //get da descrição
    get descricao() {
        return this._descricao;
    }
    //get do tipo
    get tipo() {
        return this._tipo;
    }
    //setter da descrição
    set descricao(descricao) {
        this._descricao = descricao;
    }
    //set pedidos de amizade
    set pedidosAmizade(pedidos) {
        this._pedidosAmizade = pedidos;
    }
    //set status
    set status(status) {
        this._status = status;
    }
    //set amigos
    set amigos(amigos) {
        this._amigos = amigos;
    }
}
exports.Perfil = Perfil;
