import { gerarId } from "../utils/utils";
import { Publicacao } from "./Publicacao";
import { Emoji } from "../types/Emoji";
import { getTerminalWidth } from "../utils/utils-menu/utilsAuxiliaresMenu";

export class Perfil {
    private readonly _id: string; // readonly para garantir que o ID seja imutável
    private _nome: string;
    private _email: string;
    private _senha: string;
    private _status: boolean;
    private _amigos: string[]; // Array de Amigos
    private _posts: string[]; // Arrays de Posts --> SUJEITO A ALTERAÇÕES
    private _descricao: string;
    private _fotoPerfil: Emoji;
    private _pedidosAmizade: string[]; // Array de Pedidos de Amizade
    private _tipo: string;

    constructor(
        nome: string,
        email: string,
        senha: string,
        foto: Emoji = '👤',
        descricao: string = "Vazio",
        tipo: string = 'ps',
        amigos = [],
        pedidosAmizade = [],
        posts = [],
        status = true,
        id?: string
    ) {
        this._id = id ? id : gerarId();
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._status = status;
        this._amigos = amigos;
        this._posts = posts;
        this._descricao = descricao;
        this._fotoPerfil = foto;
        this._pedidosAmizade = pedidosAmizade;
        this._tipo = tipo;
    }

    // Método para adicionar um Amigo --> SUJEITO A ALTERAÇÕES
    public adicionarAmigo(nomeAmigo: string): void {
        // Ensure _amigos is an array
        if (!Array.isArray(this._amigos)) {
            this._amigos = [];
        }
        this._amigos.push(nomeAmigo);
    }


    // Método para remover um amigo pelo nome --> SUJEITO A ALTERAÇÕES
    public removerAmigo(nomeAmigo: string): boolean {
        // Percorre o array de amigos até achar um valor que satisfaz a condição
        const index = this._amigos.findIndex((amigo) => amigo === nomeAmigo);

        if (index !== -1) {
            this._amigos.splice(index, 1); // Remove o amigo da lista diretamente

            return true; // Retorna true se o amigo foi removido
        }

        return false; // Retorna false se o amigo não foi encontrado
    }

    public ehAmigo(nomeAmigo: string): boolean {
        return this._amigos.includes(nomeAmigo);
    }

    // Método para listar amigos --> SUJEITO A ALTERAÇÕES
    public listarAmigos(): string[] {
        return this.amigos;
    }

    // Setter que pode ser usado pela classe PerfilAvancado para modificar o status dos perfis
    public setStatus(novoStatus: boolean): void {
        this._status = novoStatus;
    }

    // Método para adicionar postagem no perfil
    public adicionarPostagem(post: Publicacao): void {
        this._posts.push(post.conteudo);
    }

    //metodo que remove o pedido de amizade dos meus pedidos de amizade
    public removerPedidoAmizade(nomeSolicitante: string): boolean {
        const index = this._pedidosAmizade.findIndex((nome: string) => nome === nomeSolicitante);

        if (index !== -1) {
            this._pedidosAmizade.splice(index, 1);
            return true;
        }
        return false
    }
    // Método para listar postagens do perfil
    public listarPostagens(): string[] {
        return this._posts;
    }

    //metodo para alterar a foto de perfil
    public alterarFotoPerfil(novaFoto: Emoji): void {
        this._fotoPerfil = novaFoto;
    }

    // Método para adicionar pedidos de amizade ao perfil
    public adicionarPedidosAmizade(nomeSolicitante: string) : void {
        this._pedidosAmizade.push(nomeSolicitante);
    }

    //função que verifica se a senha informada é igual a senha do perfil
    public verificarSenha(senha: string): boolean {
        return this._senha === senha;
    }

    public contarAmigos(): number {
        return this._amigos.length;
    }

    public contarPublicacoes(): number {
        return Array.isArray(this._posts) ? this._posts.length : 0;
    }

    public get fotoPerfil(): Emoji {
        return this._fotoPerfil;
    }

    //metodo que veriica se o perfil já fez o pedido de amizade
    public jaFezPedidoAmizade(nomePerfil: string): boolean {
        return this._pedidosAmizade.includes(nomePerfil);
    }

     /**
   * Exibe o perfil do usuário em uma box estilizada e centralizada.
   * Utiliza os métodos do próprio Perfil para contabilizar amigos e publicações.
   */
  public exibirPerfilFormatado(normal : boolean = true): string {
    const terminalWidth = getTerminalWidth();
    const boxWidth = 50;
    const countPublicacoes = this.contarPublicacoes();
    const titulo = normal ? "SEU PERFIL" : "PERFIL";
    const linhas = [
      titulo,
      "",
      `Foto: ${this.foto || '👤'}  Nome: ${this.nome}`,
      `Email: ${this.email}`,
      `Amigos: ${this.contarAmigos()} | Publicações: ${countPublicacoes}`,
      `Descrição: ${this.descricao}`
    ];

    const topo = "╔" + "═".repeat(boxWidth) + "╗";
    const fundo = "╚" + "═".repeat(boxWidth) + "╝";
    const padLeft = Math.floor((terminalWidth - (boxWidth + 2)) / 2);
    const leftPad = ' '.repeat(padLeft);

    console.log(leftPad + topo);
    linhas.forEach(linha => {
      // Se a linha for do email, adiciona um espaço extra ao final
      const linhaModificada = linha.startsWith("Foto:") ? "" : "";
      console.log(leftPad + "║" + linha.padEnd(boxWidth, ' ') + linhaModificada + "║");
    });
    return `${leftPad + fundo}`;
  }

  //metodo que vai exibir o perfil como amigo
    public exibirComoAmigo(): string {
        const terminalWidth = getTerminalWidth();
        const boxWidth = 50;
        const countAmigos = this.contarAmigos();
        const countPublicacoes = this.contarPublicacoes();
        const linhas = [
            `Foto: ${this.foto || '👤'} Nome: ${this.nome}`,
            `Descrição: ${this.descricao}`,
            `Amigos: ${countAmigos} Publicações: ${countPublicacoes}`
        ];
        const padLeft = ' '.repeat(Math.floor((terminalWidth - (boxWidth + 2)) / 2));
        const topo = ' '.repeat(Math.floor((terminalWidth - (boxWidth + 2)) / 2) - 2) + "╔" + "═".repeat(boxWidth) + "╗";
        const fundo = padLeft + "╚" + "═".repeat(boxWidth) + "╝";
        let result = topo + "\n";
        linhas.forEach(linha => {
            let rightExtra = linha.includes("Foto") ? "" : "";
            result += padLeft + "║" + linha.padEnd(boxWidth, ' ') + rightExtra + "║\n";
        });
        result += fundo;
        return result;
    }
    
        /**
     * Exibe o perfil do usuário em uma box estilizada e centralizada,
     * incluindo informações adicionais como status e tipo (Avançado/Simples).
     */
    public exibirPerfilCompleto(exibir : boolean = false): string {
        const terminalWidth = getTerminalWidth();
        const boxWidth = 50;
        const countPublicacoes = this.contarPublicacoes();
        const statusTexto = this.status ? "Ativado" : "Desativado";
        const tipoTexto = (this.tipo === "pa") ? "Avançado" : ((this.tipo === "ps") ? "Simples" : this.tipo);
        
        const linhas = [
        "SEU PERFIL COMPLETO",
        "",
        `Foto: ${this.foto || '👤'}  Nome: ${this.nome}`,
        `Email: ${this.email}`,
        `Amigos: ${this.contarAmigos()} | Publicações: ${countPublicacoes}`,
        `Descrição: ${this.descricao}`,
        `Status: ${statusTexto} | Tipo: ${tipoTexto}`
        ];
    
        const topo = "╔" + "═".repeat(boxWidth) + "╗";
        const fundo = "╚" + "═".repeat(boxWidth) + "╝";
        const padLeft = Math.floor((terminalWidth - (boxWidth + 2)) / 2);
        const leftPad = ' '.repeat(padLeft);
        let menos = exibir ? 0 : 2;
        let result = ' '.repeat(padLeft - menos) + topo + "\n";
        linhas.forEach(linha => {
            let linhaModificada = linha.startsWith("Foto:") ? "" : "";
            result += leftPad + "║" + linha.padEnd(boxWidth, ' ') +  linhaModificada + "║\n";
        });
        result += leftPad + fundo;
        return result;
    }

    public get id() {
        return this._id;
    }

    public get nome() {
        return this._nome;
    }

    public get email() {
        return this._email;
    }

    public get status() {
        return this._status;
    }

    public get amigos() {
        return this._amigos;
    }

    public get posts() {
        return this._posts;
    }

    public get foto() {
        return this._fotoPerfil;
    }

    public get pedidosAmizade() {
        return this._pedidosAmizade;
    }

    //get da descrição
    public get descricao(): string {
        return this._descricao;
    }

    //get de senha
    public get senha(): string {
        return this._senha;
    }
    //get do tipo
    public get tipo(): string {
        return this._tipo;
    }

    //setter da descrição
    public set descricao(descricao: string) {
        this._descricao = descricao;
    }

    //set pedidos de amizade
    public set pedidosAmizade(pedidos: string[]) {
        this._pedidosAmizade = pedidos;
    }

    //set status
    public set status(status: boolean) {
        this._status = status;
    }

    //ser de status
    public set senha(senha: string) {
        this._senha = senha;
    }

    //set amigos
    public set amigos(amigos: string[]) {
        this._amigos = amigos;
    }

    //set foto
    public set foto(foto: Emoji) {
        this._fotoPerfil = foto;
    }
}