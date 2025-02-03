import { Perfil } from "./Perfil";
import { PerfilAvancado } from "./PerfilAvancado";
import { Publicacao } from "./Publicacao";
import { PublicacaoAvancada } from "./PublicacaoAvancada";
import { Interacao } from "./Interacao";
import inquirer from "inquirer";
import { RespostaCadastro } from "../types/Respostas";



export class App {
    private perfis: Perfil[] = [];
    private publicacoes: Publicacao[] = [];
    private interacoes: Interacao[] = []; //tem muita coisa sujeita a mudança aqui ó

    constructor() {
        //inicializa com os dados padroes ent nao precisa de nada aqui
        //ou seria melhor tá aqui?
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
        console.log(`ID: ${perfil.id} | Nome: ${perfil.nome} | Email: ${perfil.email}`);
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
                //FALTA EU COLOCAR VALIDAÇÃO AQUI PRA TAMNHO SEPA
            },{
                name: "email",
                message: "Digite seu email:",
                type: "input",
                //FALTA AQUI TAMB´ME VALIDAÇÃO DE EMAIL PRA VER SE SEGUE PADRÃO DE FORMATAÇÃO
            },{
                name: "senha",
                message: "Digite sua senha:",
                type: "password",
                mask: "*",
                //AQUI MESMA COISA PRA TAMANHO
            },{
                name: "verificacaoSenha",
                message: "Digite novamente sua senha:",
                type: "password",
                mask: "*",},
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




}