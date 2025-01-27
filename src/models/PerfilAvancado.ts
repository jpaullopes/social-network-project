import { Perfil } from "../models/Perfil";

export class PerfilAvancado extends Perfil {

    constructor(nome: string, email: string, senha: string){
        super(nome, email, senha);
    }

    // Método para habilitar o perfil de outro usuário
    public habilitarPerfil(perfil: Perfil): boolean {

        // Verifica se o usuário é uma instância de PerfilAvancado, impedindo a modificação do status
        if (perfil instanceof PerfilAvancado) {

            return false // Retorna false se o perfil for avançado

        } else {
            perfil.setStatus(true); // Altera o status do perfil para ativo

            return true // Retorna true se o perfil for normal
        }
    }


    // Método para desabilitar o perfil de outro usuário
    public desabilitarPerfil(perfil: Perfil): boolean {

        // Verifica se o usuário é uma instância de PerfilAvancado, impedindo a modificação do status
        if (perfil instanceof PerfilAvancado) {

            return false // Retorna false se o perfil for avançado

        } else {
            perfil.setStatus(false); // Altera o status do perfil para inativo
            
            return true // Retorna true se o perfil for normal
        }

    }
    
    public criarPerfilAvancado(nome: string, email: string, senha: string): PerfilAvancado {
        return new PerfilAvancado(nome, email, senha);
    }
} 