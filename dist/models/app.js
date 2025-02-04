"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
//import de leitura de arquivos
const lp = __importStar(require("../utils/utilsPublicacaoJson")); //responsavel pela leitur e escrita json de publicações
const lu = __importStar(require("../utils/utilsPerfilJson")); //responsavel pela leitur e escrita json de usuarios
class App {
    constructor() {
        this.perfis = [];
        this.publicacoes = [];
        this.interacoes = []; //tem muita coisa sujeita a mudança aqui ó
        //inicializa com os dados padroes ent nao precisa de nada aqui
        //ou seria melhor tá aqui?
        const data = this.lerUsuarios(); // assuming this returns an object with property "perfis"
        this.perfis = data.perfis || []; // use the perfis array or an empty array if undefined
        const data2 = this.lerPublicacoes(); // assuming this returns an object with property "publicacoes"
        this.publicacoes = data2.publicacoes || []; // use the publicacoes array or an empty array if undefined
    }
    //AQUI FICA A PARTE DE LEITURA 
    lerUsuarios() {
        return lu.readJSONFile(lu.FILE_PATH);
    }
    lerPublicacoes() {
        return lp.readJSONFile(lp.FILE_PATH);
    }
    //PARTE DE ESCRITA  
    escreverUsuarios() {
        lu.writeJSONFile(lu.FILE_PATH, this.perfis);
    }
    escreverPublicacoes() {
        lp.writeJSONFile(lp.FILE_PATH, this.publicacoes);
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
            console.log(`ID: ${perfil.id} | Foto ${perfil.foto}| Nome: ${perfil.nome} | Email: ${perfil.email} | Descricao: ${perfil.descricao}`);
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
                        validate: (input) => {
                            if (input.length < 3) {
                                return "O nome deve ter pelo menos 3 caracteres.";
                            }
                            return true;
                        }
                    }, {
                        name: "email",
                        message: "Digite seu email:",
                        type: "input",
                        validate: (input) => {
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            if (!emailRegex.test(input)) {
                                return "Por favor, insira um email válido.";
                            }
                            return true;
                        }
                    }, {
                        name: "senha",
                        message: "Digite sua senha:",
                        type: "password",
                        mask: "*",
                        validate: (input) => {
                            if (input.length < 6) {
                                return "A senha deve ter pelo menos 6 caracteres.";
                            }
                            return true;
                        }
                    }, {
                        name: "verificacaoSenha",
                        message: "Digite novamente sua senha:",
                        type: "password",
                        mask: "*",
                        validate: (input) => {
                            if (input.length < 6) {
                                return "A senha deve ter pelo menos 6 caracteres.";
                            }
                            return true;
                        },
                    }
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
    //função que erá o login do user ,  função precisa retornar o usuario logado
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            let respostas;
            let usuarioExistente = false;
            let senhaCorreta = false;
            respostas = yield inquirer_1.default.prompt([
                {
                    name: "nome",
                    message: "Digite seu nome:",
                    type: "input",
                    validate: (input) => {
                        if (input.length < 3) {
                            return "O nome deve ter pelo menos 3 caracteres.";
                        }
                        return true;
                    }
                }, {
                    name: "senha",
                    message: "Digite sua senha:",
                    type: "password",
                    mask: "*",
                    validate: (input) => {
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
                senhaCorreta = (userExiste === null || userExiste === void 0 ? void 0 : userExiste.verificarSenha(respostas.senha)) || false; //verifica se a senha está correta
            }
            //aqui verifica se a senha e o usuario existem e se sim então retorna o perfil, se não retorna undefined
            if (usuarioExistente && senhaCorreta) {
                return userExiste;
            }
            return undefined;
            //funcionou certinho até agora
        });
    }
    //get de perfis
    getPerfis() {
        return this.perfis;
    }
}
exports.App = App;
