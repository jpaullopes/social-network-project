"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilAvancado = void 0;
const Perfil_1 = require("../models/Perfil");
class PerfilAvancado extends Perfil_1.Perfil {
    constructor(nome, email, senha) {
        super(nome, email, senha);
    }
    // Método para habilitar o perfil de outro usuário
    habilitarPerfil(perfil) {
        // Verifica se o usuário é uma instância de PerfilAvancado, impedindo a modificação do status
        if (perfil instanceof PerfilAvancado) {
            return false; // Retorna false se o perfil for avançado
        }
        else {
            perfil.setStatus("ativo"); // Altera o status do perfil para ativo
            return true; // Retorna true se o perfil for normal
        }
    }
    // Método para desabilitar o perfil de outro usuário
    desabilitarPerfil(perfil) {
        // Verifica se o usuário é uma instância de PerfilAvancado, impedindo a modificação do status
        if (perfil instanceof PerfilAvancado) {
            return false; // Retorna false se o perfil for avançado
        }
        else {
            perfil.setStatus("inativo"); // Altera o status do perfil para inativo
            return true; // Retorna true se o perfil for normal
        }
    }
}
exports.PerfilAvancado = PerfilAvancado;
