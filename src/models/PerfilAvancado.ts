import { Perfil } from "../models/Perfil";
import { Emoji } from "../types/Emoji";

export class PerfilAvancado extends Perfil {

    constructor(
        nome: string,
        email: string,
        senha: string,
        foto: Emoji = '👤',
        descricao: string = "Sem descrição no momento",
        tipo: string = 'pa',
        amigos = [],
        pedidosAmizade = [],
        posts = [],
        id?: string
    ) {
        super(nome, email, senha, foto, descricao, tipo, amigos, pedidosAmizade, posts ,id);
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