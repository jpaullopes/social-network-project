import { Perfil } from "../models/Perfil";

export class PerfilAvancado extends Perfil {

    constructor(nome: string, email: string, senha: string){
        super(nome, email, senha);
    }

    // Método para habilitar o perfil de outro usuário
    public habilitarPerfil(outroPerfil: Perfil): boolean {
        outroPerfil.setStatus(true); // Altera o status do perfil para ativo
        
        return true // Retorna true ao habilitar
    }


    // Método para desabilitar o perfil de outro usuário
    public desabilitarPerfil(outroPerfil: Perfil): boolean {
            outroPerfil.setStatus(false); // Altera o status do perfil para inativo
            
            return true // Retorna true ao desabilitar
    }
    
    public criarPerfilAvancado(nome: string, email: string, senha: string, foto: string): PerfilAvancado {
        return new PerfilAvancado(nome, email, senha);
    }
} 