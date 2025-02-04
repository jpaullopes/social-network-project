"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const Perfil_1 = require("./Perfil");
const Publicacao_1 = require("./Publicacao");
const PublicacaoAvancada_1 = require("./PublicacaoAvancada");
const inquirer_1 = __importDefault(require("inquirer"));
class App {
    constructor() {
        this.perfis = [];
        this.publicacoes = [];
        this.interacoes = []; //tem muita coisa sujeita a mudança aqui ó
        //inicializa com os dados padroes ent nao precisa de nada aqui
        //ou seria melhor tá aqui?
    }
    //adiciona um perfil
    adicionarPerfil(perfil) {
        this.perfis.push(perfil);
    }
    //adiciona uma publicação
    adicionarPublicacao(publicacao) {
        this.publicacoes.push(publicacao);
    }
    //adiciona uma interação
    adicionarInteracao(interacao) {
        this.interacoes.push(interacao);
    }
    //classe de teste só para ver as coisas funcionando
    listarPerfis() {
        console.log("=== Lista de Perfis ===");
        this.perfis.forEach(perfil => {
            console.log(`ID: ${perfil.id} | Nome: ${perfil.nome} | Email: ${perfil.email}`);
        });
    }
    //Lista todas as publicações registradas. | mesma coisa de acima
    listarPublicacoes() {
        console.log("=== Lista de Publicações ===");
        this.publicacoes.forEach(publicacao => {
            publicacao.exibirPublicacao();
            console.log("------------------------------------------");
        });
    }
    //Lista todas as interações registradas. | mesma coisa de acima
    listarInteracoes() {
        console.log("=== Lista de Interações ===");
        this.interacoes.forEach(interacao => {
            interacao.exibirInteracao();
        });
    }
    //função que retorna um perfil com base no nome
    buscarPerfilPorNome(nome) {
        return this.perfis.find(perfil => perfil.nome === nome);
    }
    //função que retorna o nome do perfil que fez uma publicação
    buscarPerfilPorPublicacao(publicacao) {
        return this.perfis.find(perfil => perfil.nome === publicacao.perfilDoAutor);
    }
    //função que retorna um array de publicações realizadas por um perfil
    buscarPublicacoesPorPerfil(perfil) {
        return this.publicacoes.filter(publicacao => publicacao.perfilDoAutor === perfil.nome);
    }
    //perfil faz uma publicação simples
    fazerPublicacao(perfil, conteudo) {
        const publicacao = new Publicacao_1.Publicacao(conteudo, perfil.nome);
        this.adicionarPublicacao(publicacao);
    }
    //perfil faz uma publicação avançada
    fazerPublicacaoAvancada(perfil, conteudo, listaDeInteracao) {
        const publicacao = new PublicacaoAvancada_1.PublicacaoAvancada(conteudo, perfil.nome, listaDeInteracao);
        this.adicionarPublicacao(publicacao);
    }
    //função que realiza o cadastro do usuario // AINDA EM DESENVOLVIMENTO
    cadastrarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            let respostas;
            let nomeExistente = false;
            let emailExistente = false;
            do {
                respostas = yield inquirer_1.default.prompt([
                    { name: "nome",
                        message: "Digite seu nome:",
                        type: "input",
                        //FALTA EU COLOCAR VALIDAÇÃO AQUI PRA TAMNHO SEPA
                    }, {
                        name: "email",
                        message: "Digite seu email:",
                        type: "input",
                        //FALTA AQUI TAMB´ME VALIDAÇÃO DE EMAIL PRA VER SE SEGUE PADRÃO DE FORMATAÇÃO
                    }, {
                        name: "senha",
                        message: "Digite sua senha:",
                        type: "password",
                        mask: "*",
                        //AQUI MESMA COISA PRA TAMANHO
                    }, {
                        name: "verificacaoSenha",
                        message: "Digite novamente sua senha:",
                        type: "password",
                        mask: "*",
                    },
                ]);
                // Verifica se o nome já existe entre os perfis cadastrados (ignora diferenças de caixa)
                nomeExistente = this.perfis.some((perfil) => perfil.nome.toLowerCase() === respostas.nome.toLowerCase());
                //Verifica se o email já existe entre os perfis cadastrados
                emailExistente = this.perfis.some((perfil) => perfil.email.toLowerCase() === respostas.email.toLowerCase());
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
            const novoPerfil = new Perfil_1.Perfil(respostas.nome, respostas.email, respostas.senha);
            this.perfis.push(novoPerfil);
            console.log(respostas);
        });
    }
}
exports.App = App;
