"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilAvancado = void 0;
const Perfil_1 = require("../models/Perfil");
class PerfilAvancado extends Perfil_1.Perfil {
    constructor(nome, email, senha, foto) {
        super(nome, email, senha, foto);
    }
    // Método para habilitar o perfil de outro usuário
    habilitarPerfil(outroPerfil) {
        // Verifica se o usuário é uma instância de PerfilAvancado, impedindo a modificação do status
        if (outroPerfil instanceof PerfilAvancado) {
            return false; // Retorna false se o perfil for avançado
        }
        else {
            outroPerfil.setStatus(true); // Altera o status do perfil para ativo
            return true; // Retorna true se o perfil for normal
        }
    }
    // Método para desabilitar o perfil de outro usuário
    desabilitarPerfil(outroPerfil) {
        // Verifica se o usuário é uma instância de PerfilAvancado ou se a referência é ele mesmo, impedindo a modificação do status
        if (outroPerfil instanceof PerfilAvancado) {
            console.log("NAO DAAA");
            return false; // Retorna false se o perfil for avançado ou se tentar desabilitar a si mesmo
        }
        else {
            outroPerfil.setStatus(false); // Altera o status do perfil para inativo
            return true; // Retorna true se o perfil for normal
        }
    }
    criarPerfilAvancado(nome, email, senha, foto) {
        return new PerfilAvancado(nome, email, senha, foto);
    }
}
exports.PerfilAvancado = PerfilAvancado;
