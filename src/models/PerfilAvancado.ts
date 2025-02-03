import { Perfil } from "../models/Perfil";

export class PerfilAvancado extends Perfil {

    constructor(nome: string, email: string, senha: string, foto: string){
        super(nome, email, senha, foto);
    }

    // Método para habilitar o perfil de outro usuário
    public habilitarPerfil(outroPerfil: Perfil): boolean {

        // Verifica se o usuário é uma instância de PerfilAvancado, impedindo a modificação do status
        if (outroPerfil instanceof PerfilAvancado) {

            return false // Retorna false se o perfil for avançado

        } else {
            
            outroPerfil.setStatus(true); // Altera o status do perfil para ativo

            return true // Retorna true se o perfil for normal
        }
    }


    // Método para desabilitar o perfil de outro usuário
    public desabilitarPerfil(outroPerfil: Perfil): boolean {

        // Verifica se o usuário é uma instância de PerfilAvancado ou se a referência é ele mesmo, impedindo a modificação do status
        if (outroPerfil instanceof PerfilAvancado || outroPerfil === this) {

            return false // Retorna false se o perfil for avançado ou se tentar desabilitar a si mesmo

        } else {
            outroPerfil.setStatus(false); // Altera o status do perfil para inativo
            
            return true // Retorna true se o perfil for normal
        }

    }
    
    public criarPerfilAvancado(nome: string, email: string, senha: string, foto: string): PerfilAvancado {
        return new PerfilAvancado(nome, email, senha, foto);
    }
} 