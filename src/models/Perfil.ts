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
        id?: string
    ) {
        this._id = id ? id : gerarId();
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._status = true;
        this._amigos = amigos;
        this._posts = posts;
        this._descricao = descricao;
        this._fotoPerfil = foto;
        this._pedidosAmizade = pedidosAmizade;
        this._tipo = tipo;
    }

    // Método para adicionar um Amigo --> SUJEITO A ALTERAÇÕES
    public adicionarAmigo(nomeAmigo: string): boolean {
        if (!this._amigos.includes(nomeAmigo)) {
            this._amigos.push(nomeAmigo);

            return true; // Retorna true se amigo adicionado com sucesso
        }

        return false; // Retorna false se amigo já estiver adicionado
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

     /**
   * Exibe o perfil do usuário em uma box estilizada e centralizada.
   * Utiliza os métodos do próprio Perfil para contabilizar amigos e publicações.
   */
  public exibirPerfilFormatado(): void {
    const terminalWidth = getTerminalWidth();
    const boxWidth = 50;
    const countPublicacoes = this.contarPublicacoes();
    const linhas = [
      "SEU PERFIL",
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
      const linhaModificada = linha.startsWith("Foto:") ? " " : "";
      console.log(leftPad + "║" + linha.padEnd(boxWidth, ' ') + linhaModificada + "║");
    });
    console.log(leftPad + fundo);
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

    //set amigos
    public set amigos(amigos: string[]) {
        this._amigos = amigos;
    }
}