"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilAvancado = void 0;
const Perfil_1 = require("../models/Perfil");
class PerfilAvancado extends Perfil_1.Perfil {
    constructor(nome, email, senha, foto = '👤', descricao = "Sem descrição no momento", id, advancedFeature = "") {
        super(nome, email, senha, foto, descricao, id);
        this._advancedFeature = advancedFeature;
    }
    // Método para habilitar o perfil de outro usuário
    habilitarPerfil(outroPerfil) {
        outroPerfil.setStatus(true); // Altera o status do perfil para ativo
        return true; // Retorna true ao habilitar
    }
    // Método para desabilitar o perfil de outro usuário
    desabilitarPerfil(outroPerfil) {
        outroPerfil.setStatus(false); // Altera o status do perfil para inativo
        return true; // Retorna true ao desabilitar
    }
    criarPerfilAvancado(nome, email, senha, foto) {
        return new PerfilAvancado(nome, email, senha);
    }
}
exports.PerfilAvancado = PerfilAvancado;
