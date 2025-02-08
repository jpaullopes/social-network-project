import { Perfil } from "./Perfil";
import { PerfilAvancado } from "./PerfilAvancado";
import { Publicacao } from './Publicacao';
import { PublicacaoAvancada } from "./PublicacaoAvancada";
import { Interacao } from "./Interacao";
import inquirer from "inquirer";
import { RespostaCadastro, RespostaLogin } from "../types/Respostas";
import { Emoji } from "../types/Emoji";

import { centerText, displayHeader, generalizarMenus } from "../utils/utils-menu/utilsAuxiliaresMenu";
import { alterarDescricaoPerfil } from "../utils/utilsPerfilJson";
import * as um from "../utils/utils-menu/utilsMenu"; //import de funções de menu

//import de leitura de arquivos
import * as lp from "../utils/utilsPublicacaoJson"; //responsavel pela leitur e escrita json de publicações
import * as lu from "../utils/utilsPerfilJson"; //responsavel pela leitur e escrita json de usuarios
import * as li from "../utils/utilsInteracaoJson"; //responsavel pela leitur e escrita json de interações

export class App {
    private perfis: Perfil[] = [];
    private publicacoes: Publicacao[] = [];
    private interacoes: Interacao[] = []; //tem muita coisa sujeita a mudança aqui ó

    constructor() {
        const usuariosData = lu.readJSONFile(lu.FILE_PATH);
        // When file is an array or an object with 'perfis' property, use the correct one.
        const perfisRaw = Array.isArray(usuariosData) ? usuariosData : (usuariosData.perfis || []);
        // Map each raw user object to a Perfil instance
        this.perfis = perfisRaw.map((p: any) => {
                   if(p._tipo === 'pa'){
                    return new PerfilAvancado(
                        p._nome,
                        p._email,
                        p._senha,
                        p.foto,
                        p.descricao,
                        p._tipo, 
                        p._id
                    );}
                   else{
                        return new Perfil(
                         p._nome,
                         p._email,
                         p._senha,
                         p.foto,
                         p.descricao,
                         p._tipo, 
                         p._id
                        );
                   }
                });
        
        //aqui
        const pubsData = lp.readJSONFile(lp.FILE_PATH);
        const pubsRaw = Array.isArray(pubsData) ? pubsData : (pubsData.publicacoes || []);
        this.publicacoes = pubsRaw.map((pub: any) => {
            // Se for uma publicação avançada, cria uma instância de PublicacaoAvancada
            if (pub._tipo === 'pa') {
                return new PublicacaoAvancada(
                    pub._conteudo,
                    pub._perfilDoAutor,
                    pub._listaDeInteracao,      
                    pub._tipo,   // lista de interações já presente no JSON
                    pub._dataDePublicacao, // garantindo que seja uma instância Date
                    pub._id
                );
            } else {
                // Caso contrário, cria uma publicação simples
                return new Publicacao(
                    pub._conteudo,
                    pub._perfilDoAutor,
                    pub._tipo,                      
                    pub._dataDePublicacao,
                    pub._id
                );
            }
        });


        // Interacoes
        const interacoesData = li.readJSONFile(li.FILE_PATH);
        const interacoesRaw = Array.isArray(interacoesData) ? interacoesData : (interacoesData.interacoes || []);
        this.interacoes = interacoesRaw.map((i: any) =>
            new Interacao(i.tipo, i.publicacao, i._perfilDoAutor ,i._id)
        );
    }

    // Atualiza a leitura dos usuários para criar instâncias de Perfil
    public lerUsuarios(): Perfil[] {
        const data = lu.readJSONFile(lu.FILE_PATH);
        const perfisRaw = Array.isArray(data) ? data : (data.perfis || []);
        return perfisRaw.map((p: any) => new Perfil(p._nome, p._email, p._senha, p.foto, p.descricao));
    }

    // Atualiza a leitura das publicações para criar instâncias de Publicacao
    public lerPublicacoes(): Publicacao[] {
        const data = lp.readJSONFile(lp.FILE_PATH);
        const pubsRaw = Array.isArray(data) ? data : (data.publicacoes || []);
        return pubsRaw.map((pub: any) => {
            // Se a publicação tiver lista de interações, cria uma instância de PublicacaoAvancada
            if (pub.listaDeInteracao && Array.isArray(pub.listaDeInteracao)) {
                return new PublicacaoAvancada(pub.conteudo, pub.perfilDoAutor, pub.listaDeInteracao, pub.dataDePublicacao, pub._id);
            } else {
                return new Publicacao(pub.conteudo, pub.perfilDoAutor, pub.dataDePublicacao, pub._id);
            }
        });
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
        this.publicacoes.forEach(publicacao => {
            publicacao.exibirPublicacao();
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
    public publicacaoSimples(perfil: Perfil, conteudo: string): void {
        const publicacao = new Publicacao(conteudo, perfil.nome);
        this.adicionarPublicacao(publicacao);
        lp.adicionarPublicacaoNoJson(publicacao);
    }

    public publicacaoAvancada(perfil: Perfil, conteudo: string, listaDeInteracao: Interacao[]): void {
        const publicacao = new PublicacaoAvancada(conteudo, perfil.nome, listaDeInteracao);
        this.adicionarPublicacao(publicacao);
        lp.adicionarPublicacaoNoJson(publicacao);
    }

    //perfil faz uma publicação avançada
    public fazerPublicacaoAvancada(perfil: Perfil, conteudo: string, listaDeInteracao: Interacao[]): void {
        const publicacao = new PublicacaoAvancada(conteudo, perfil.nome, listaDeInteracao);
        this.adicionarPublicacao(publicacao);
    }

    //função que realiza o cadastro do usuario // AINDA EM DESENVOLVIMENTO
    public async cadastrarUsuario(): Promise<void> {
        const titulo = "Cadastro de Usuário";
        let respostas: RespostaCadastro;
        let nomeExistente = false;
        let emailExistente = false;

        //exibir o menu de cadastro
        displayHeader(titulo);

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
            (perfil) => typeof perfil.nome === 'string' && perfil.nome.toLowerCase() === respostas.nome.toLowerCase()
            );
            //Verifica se o email já existe entre os perfis cadastrados
            emailExistente = this.perfis.some(
                (perfil) => typeof perfil.email === 'string' && perfil.email.toLowerCase() === respostas.email.toLowerCase()
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
        lu.adicionarPerfilNoJson(novoPerfil);

        console.log(respostas); 
    }

    //função que erá o login do user ,  função precisa retornar o usuario logado
    public async login(): Promise<Perfil | undefined> {
        const titulo = "Login";
        let respostas: RespostaLogin;
        let usuarioExistente = false;
        let senhaCorreta = false;

        //exibir o menu de login
        displayHeader(titulo);

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
            if (usuarioExistente && senhaCorreta && userExiste) {
                return userExiste;
            }
            return undefined;
            //funcionou certinho até agora

    }

    //metedo vai fazer a publicação e com um parametro ele vai fazer a publicação avançada
    public async fazerPublicacao(perfil: Perfil, avancado : boolean = false): Promise<void> {
        const { conteudo } = await inquirer.prompt([
            {
                name: "conteudo",
                message: "Digite o conteúdo da publicação:",
                type: "input"
            }
        ]);
        if(avancado){
            this.publicacaoAvancada(perfil, conteudo, []);
        }
        else{
            this.fazerPublicacao(perfil, conteudo);
        }



    
    }

    //função que verifica se o tipo de perfil é ou não avançado
    public verificarPerfilAvancado(perfil: Perfil): boolean {
        return perfil.tipo === 'pa';
    }

    //função que exibe as interações de uma publicação avançada | vamo considerar que só de avançada
    public exibirInteracoes(publicacao: PublicacaoAvancada): void {
        console.log("=== Interações da Publicação ===");
        publicacao.getInteracoes().forEach(interacao => {
            interacao.exibirInteracao();
        });
    }

    //aqui vai ficar a função que interage com o menu de interações na publicação avançada
    //vou fazer só o grosso aqui, depois a gente ajeita
    public async interagirPublicacao(publicacao: PublicacaoAvancada, perfilInterator : Perfil): Promise<void> {
        let exit = false;
        let opcaoEscolhida = await um.menuInteracoes();
        let emojiEscolhido: Emoji | undefined;
        let interator = perfilInterator.nome;

        switch (opcaoEscolhida) {
            case 1:
                //curtir
                emojiEscolhido = '👍';
                const curtida = new Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(curtida);
                this.adicionarInteracao(curtida);
                
                li.adicionarInteracaoNoJson(curtida);

                console.log("Curtida realizada com sucesso!");
                break;
            case 2:
                //não curtir
                emojiEscolhido = '👎';
                const naoCurtida = new Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(naoCurtida);
                this.adicionarInteracao(naoCurtida);

                li.adicionarInteracaoNoJson(naoCurtida);

                console.log("Não curtida realizada com sucesso!");
                break;
            case 3:
                //risos
                emojiEscolhido = '😂';
                const risos = new Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(risos);
                this.adicionarInteracao(risos);

                li.adicionarInteracaoNoJson(risos);

                console.log("Risos realizados com sucesso!");
                break;
            case 4:
                //surpresa
                emojiEscolhido = '😲';
                const surpresa = new Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(surpresa);
                this.adicionarInteracao(surpresa);

                li.adicionarInteracaoNoJson(surpresa);

                console.log("Surpresa realizada com sucesso!");
                break;
            case 5:
                //em desenvolvimento
                break;
            case 0:
                exit = true;
                break;
            default:
                console.log("Opção inválida.");
                break;
        }
    }

    //metodo que chama o busca de perfil dos menus
    public async buscarPerfil(): Promise<Perfil | undefined> {
        const nome = await um.buscarPerfil(this.perfis);
        const perfilEncontrado = this.buscarPerfilPorNome(nome);
        if (perfilEncontrado) {
            return perfilEncontrado;
        }
        return undefined;
    }

    //metodo que chama o menu de alteração de descrição 
    public async alterarDescricaoPerfil(perfil: Perfil): Promise<void> {
        let novaDescricao  = await um.alterarDescricao();
        alterarDescricaoPerfil(perfil.nome, novaDescricao);
    }

    public async menuFeed() {
      try {
        displayHeader('FEED');
        
        const opcoes = [
          { name: centerText('Filtrar Publicações'), value: 1 },
          { name: centerText('Interagir com Publicações'), value: 2 },
          { name: centerText('Voltar'), value: 0 },
        ];

        this.listarPublicacoes();
    
        const resposta = await generalizarMenus(opcoes);
        return resposta;
      } catch (error) {
        console.error("Erro no menuFeed:", error);
        return null;
      }
    }


    //get de perfis
    public getPerfis(): Perfil[] {
        return this.perfis;
    }

    public getPublicacoes(): Publicacao[] {
        return this.publicacoes;
    }


}