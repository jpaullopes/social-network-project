import { Perfil } from "./Perfil";
import { PerfilAvancado } from "./PerfilAvancado";
import { Publicacao } from "./Publicacao";
import { PublicacaoAvancada } from "./PublicacaoAvancada";
import { Interacao } from "./Interacao";
import inquirer from "inquirer";
import { RespostaCadastro, RespostaLogin } from "../types/Respostas";

//import de leitura de arquivos
import * as lp from "../utils/utilsPublicacaoJson"; //responsavel pela leitur e escrita json de publicações
import * as lu from "../utils/utilsPerfilJson"; //responsavel pela leitur e escrita json de usuarios


export class App {
    private perfis: Perfil[] = [];
    private publicacoes: Publicacao[] = [];
    private interacoes: Interacao[] = []; //tem muita coisa sujeita a mudança aqui ó

    constructor() {
        //inicializa com os dados padroes ent nao precisa de nada aqui
        //ou seria melhor tá aqui?
        const data = this.lerUsuarios(); // assuming this returns an object with property "perfis"
        this.perfis = data.perfis || []; // use the perfis array or an empty array if undefined
        const data2 = this.lerPublicacoes(); // assuming this returns an object with property "publicacoes"
        this.publicacoes = data2.publicacoes || []; // use the publicacoes array or an empty array if undefined
    }

    //AQUI FICA A PARTE DE LEITURA 
    public lerUsuarios() : any { //função que lê os usuarios do arquivo json
        return lu.readJSONFile(lu.FILE_PATH);
    }

    public lerPublicacoes() : any{ //função que lê as publicações do arquivo json
        return lp.readJSONFile(lp.FILE_PATH);
    }

    //PARTE DE ESCRITA  
    public escreverUsuarios() : void{ //função que escreve os usuarios no arquivo json
        lu.writeJSONFile(lu.FILE_PATH, this.perfis);
    }

    public escreverPublicacoes() : void{ //função que escreve as publicações no arquivo json
        lp.writeJSONFile(lp.FILE_PATH, this.publicacoes);
    }



    //adiciona um perfil
    public adicionarPerfil(perfil: Perfil): void {
    this.perfis.push(perfil);
    }

    //adiciona uma publicação
    public adicionarPublicacao(publicacao: Publicacao): void {
    this.publicacoes.push(publicacao);
    }

    //adiciona uma interação
    public adicionarInteracao(interacao: Interacao): void {
    this.interacoes.push(interacao);
    }

    //classe de teste só para ver as coisas funcionando
    public listarPerfis(): void {
    console.log("=== Lista de Perfis ===");
    this.perfis.forEach(perfil => {
        console.log(`ID: ${perfil.id} | Foto ${perfil.foto}| Nome: ${perfil.nome} | Email: ${perfil.email} | Descricao: ${perfil.descricao}`);
    });
    }


    //Lista todas as publicações registradas. | mesma coisa de acima
    public listarPublicacoes(): void {
    console.log("=== Lista de Publicações ===");
    this.publicacoes.forEach(publicacao => {
        publicacao.exibirPublicacao();
        console.log("------------------------------------------");
    });
    }

    //Lista todas as interações registradas. | mesma coisa de acima
    public listarInteracoes(): void {
    console.log("=== Lista de Interações ===");
    this.interacoes.forEach(interacao => {
        interacao.exibirInteracao();
    });
    }

    //função que retorna um perfil com base no nome
    public buscarPerfilPorNome(nome: string): Perfil | undefined {
        return this.perfis.find(perfil => perfil.nome === nome);
    }

    //função que retorna o nome do perfil que fez uma publicação
    public buscarPerfilPorPublicacao(publicacao: Publicacao): Perfil | undefined {
        return this.perfis.find(perfil => perfil.nome === publicacao.perfilDoAutor);
    }

    //função que retorna um array de publicações realizadas por um perfil
    public buscarPublicacoesPorPerfil(perfil: Perfil): Publicacao[] {
        return this.publicacoes.filter(publicacao => publicacao.perfilDoAutor === perfil.nome);
    }

    //perfil faz uma publicação simples
    public fazerPublicacao(perfil: Perfil, conteudo: string): void {
        const publicacao = new Publicacao(conteudo, perfil.nome);
        this.adicionarPublicacao(publicacao);
    }

    //perfil faz uma publicação avançada
    public fazerPublicacaoAvancada(perfil: Perfil, conteudo: string, listaDeInteracao: Interacao[]): void {
        const publicacao = new PublicacaoAvancada(conteudo, perfil.nome, listaDeInteracao);
        this.adicionarPublicacao(publicacao);
    }

    //função que realiza o cadastro do usuario // AINDA EM DESENVOLVIMENTO
    public async cadastrarUsuario(): Promise<void> {
        let respostas: RespostaCadastro;
        let nomeExistente = false;
        let emailExistente = false;

        do {
            respostas = await inquirer.prompt([
            {   name: "nome",
                message: "Digite seu nome:",
                type: "input",
                validate: (input: string) => {
                    if (input.length < 3) {
                        return "O nome deve ter pelo menos 3 caracteres.";
                    }
                    return true;
                }
            },{
                name: "email",
                message: "Digite seu email:",
                type: "input",
                validate: (input: string) => {
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!emailRegex.test(input)) {
                        return "Por favor, insira um email válido.";
                    }
                    return true;
                }
            },{
                name: "senha",
                message: "Digite sua senha:",
                type: "password",
                mask: "*",
                validate: (input: string) => {
                    if (input.length < 6) {
                        return "A senha deve ter pelo menos 6 caracteres.";
                    }
                    return true;
                }
            },{
                name: "verificacaoSenha",
                message: "Digite novamente sua senha:",
                type: "password",
                mask: "*",
                validate: (input: string) => {
                    if (input.length < 6) {
                        return "A senha deve ter pelo menos 6 caracteres.";
                    }
                    return true;
                },
            }
            ]);
            
            // Verifica se o nome já existe entre os perfis cadastrados (ignora diferenças de caixa)
            nomeExistente = this.perfis.some(
            (perfil) => perfil.nome.toLowerCase() === respostas.nome.toLowerCase()
            );
            //Verifica se o email já existe entre os perfis cadastrados
            emailExistente = this.perfis.some(
                (perfil) => perfil.email.toLowerCase() === respostas.email.toLowerCase()
            );
            
            //aqui faz a verificação das coisas básicas, se username já existe, email e se as senha batem(coloquei verificação de senha)
            if (nomeExistente) {
                console.log("Nome já existe. Por favor, escolha outro nome.");
            }
            if (emailExistente) {
                console.log("Email já existe. Por favor, escolha outro email.");
            }
            if (respostas.senha !== respostas.verificacaoSenha) {
                console.log("Senhas não conferem. Por favor, digite novamente.");
            }
        } while (nomeExistente || emailExistente || respostas.senha !== respostas.verificacaoSenha);

        // instanciando um no perfil normal
        const novoPerfil = new Perfil(respostas.nome, respostas.email, respostas.senha);
        this.perfis.push(novoPerfil);

        console.log(respostas);
    }



    //função que erá o login do user ,  função precisa retornar o usuario logado
    public async login(): Promise<Perfil | undefined> {
        let respostas: RespostaLogin;
        let usuarioExistente = false;
        let senhaCorreta = false;

            respostas = await inquirer.prompt([
            {
                name: "nome",
                message: "Digite seu nome:",
                type: "input",
                validate: (input: string) => {
                    if (input.length < 3) {
                        return "O nome deve ter pelo menos 3 caracteres.";
                    }
                    return true;
                }
            },{
                name: "senha",
                message: "Digite sua senha:",
                type: "password",
                mask: "*",
                validate: (input: string) => {
                    if (input.length < 6) {
                        return "A senha deve ter pelo menos 6 caracteres.";
                    }
                    return true;
                }
            }
            ]);
            
            // Verifica se o nome já existe entre os perfis cadastrados 
            let userExiste = this.buscarPerfilPorNome(respostas.nome); //busca o perfil com base no nome caso tudo esteja certo
            if (userExiste) { //caso não retorne undefined
                usuarioExistente = true;
                senhaCorreta = userExiste?.verificarSenha(respostas.senha) || false; //verifica se a senha está correta
            }        
            //aqui verifica se a senha e o usuario existem e se sim então retorna o perfil, se não retorna undefined
            if (usuarioExistente && senhaCorreta) {
                return userExiste;
            }
            return undefined;
            //funcionou certinho até agora

    }

    //get de perfis
    public getPerfis(): Perfil[] {
        return this.perfis;
    }



}