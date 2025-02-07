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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const PerfilAvancado_1 = require("./PerfilAvancado");
const Publicacao_1 = require("./Publicacao");
const PublicacaoAvancada_1 = require("./PublicacaoAvancada");
const Interacao_1 = require("./Interacao");
const inquirer_1 = __importDefault(require("inquirer"));
const um = __importStar(require("../utils/utils-menu/utilsMenu")); //import de funções de menu
//import de leitura de arquivos
const lp = __importStar(require("../utils/utilsPublicacaoJson")); //responsavel pela leitur e escrita json de publicações
const lu = __importStar(require("../utils/utilsPerfilJson")); //responsavel pela leitur e escrita json de usuarios
const li = __importStar(require("../utils/utilsInteracaoJson")); //responsavel pela leitur e escrita json de interações
class App {
    constructor() {
        this.perfis = [];
        this.publicacoes = [];
        this.interacoes = []; //tem muita coisa sujeita a mudança aqui ó
        const usuariosData = lu.readJSONFile(lu.FILE_PATH);
        // When file is an array or an object with 'perfis' property, use the correct one.
        const perfisRaw = Array.isArray(usuariosData) ? usuariosData : (usuariosData.perfis || []);
        // Map each raw user object to a Perfil instance
        this.perfis = perfisRaw.map((p) => new Perfil_1.Perfil(p._nome, p._email, p._senha, p._fotoPerfil, p._descricao, p._id));
        //aqui
        const pubsData = lp.readJSONFile(lp.FILE_PATH);
        const pubsRaw = Array.isArray(pubsData) ? pubsData : (pubsData.publicacoes || []);
        this.publicacoes = pubsRaw.map((pub) => {
            // Se for uma publicação avançada, cria uma instância de PublicacaoAvancada
            if (pub._tipo === 'pa') {
                return new PublicacaoAvancada_1.PublicacaoAvancada(pub._conteudo, pub._perfilDoAutor, pub._listaDeInteracao, pub._tipo, // lista de interações já presente no JSON
                pub._dataDePublicacao, // garantindo que seja uma instância Date
                pub._id);
            }
            else {
                // Caso contrário, cria uma publicação simples
                return new Publicacao_1.Publicacao(pub._conteudo, pub._perfilDoAutor, pub._tipo, pub._dataDePublicacao, pub._id);
            }
        });
        // Interacoes
        const interacoesData = li.readJSONFile(li.FILE_PATH);
        const interacoesRaw = Array.isArray(interacoesData) ? interacoesData : (interacoesData.interacoes || []);
        this.interacoes = interacoesRaw.map((i) => new Interacao_1.Interacao(i.tipo, i.publicacao, i._id));
    }
    // Atualiza a leitura dos usuários para criar instâncias de Perfil
    lerUsuarios() {
        const data = lu.readJSONFile(lu.FILE_PATH);
        const perfisRaw = Array.isArray(data) ? data : (data.perfis || []);
        return perfisRaw.map((p) => new Perfil_1.Perfil(p._nome, p._email, p._senha, p.foto, p.descricao));
    }
    // Atualiza a leitura das publicações para criar instâncias de Publicacao
    lerPublicacoes() {
        const data = lp.readJSONFile(lp.FILE_PATH);
        const pubsRaw = Array.isArray(data) ? data : (data.publicacoes || []);
        return pubsRaw.map((pub) => {
            // Se a publicação tiver lista de interações, cria uma instância de PublicacaoAvancada
            if (pub.listaDeInteracao && Array.isArray(pub.listaDeInteracao)) {
                return new PublicacaoAvancada_1.PublicacaoAvancada(pub.conteudo, pub.perfilDoAutor, pub.listaDeInteracao, pub.dataDePublicacao, pub._id);
            }
            else {
                return new Publicacao_1.Publicacao(pub.conteudo, pub.perfilDoAutor, pub.dataDePublicacao, pub._id);
            }
        });
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
    publicacaoSimples(perfil, conteudo) {
        const publicacao = new Publicacao_1.Publicacao(conteudo, perfil.nome);
        this.adicionarPublicacao(publicacao);
        lp.adicionarPublicacaoNoJson(publicacao);
    }
    publicacaoAvancada(perfil, conteudo, listaDeInteracao) {
        const publicacao = new PublicacaoAvancada_1.PublicacaoAvancada(conteudo, perfil.nome, listaDeInteracao);
        this.adicionarPublicacao(publicacao);
        lp.adicionarPublicacaoNoJson(publicacao);
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
                nomeExistente = this.perfis.some((perfil) => typeof perfil.nome === 'string' && perfil.nome.toLowerCase() === respostas.nome.toLowerCase());
                //Verifica se o email já existe entre os perfis cadastrados
                emailExistente = this.perfis.some((perfil) => typeof perfil.email === 'string' && perfil.email.toLowerCase() === respostas.email.toLowerCase());
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
            lu.adicionarPerfilNoJson(novoPerfil);
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
    //metedo vai fazer a publicação e com um parametro ele vai fazer a publicação avançada
    fazerPublicacao(perfil_1) {
        return __awaiter(this, arguments, void 0, function* (perfil, avancado = false) {
            const { conteudo } = yield inquirer_1.default.prompt([
                {
                    name: "conteudo",
                    message: "Digite o conteúdo da publicação:",
                    type: "input"
                }
            ]);
            if (avancado) {
                this.publicacaoAvancada(perfil, conteudo, []);
            }
            else {
                this.fazerPublicacao(perfil, conteudo);
            }
        });
    }
    //função que verifica se o tipo de perfil é ou não avançado
    verificarPerfilAvancado(perfil) {
        return perfil instanceof PerfilAvancado_1.PerfilAvancado;
    }
    //função que exibe as interações de uma publicação avançada | vamo considerar que só de avançada
    exibirInteracoes(publicacao) {
        console.log("=== Interações da Publicação ===");
        publicacao.getInteracoes().forEach(interacao => {
            interacao.exibirInteracao();
        });
    }
    //aqui vai ficar a função que interage com o menu de interações na publicação avançada
    //vou fazer só o grosso aqui, depois a gente ajeita
    interagirPublicacao(publicacao) {
        return __awaiter(this, void 0, void 0, function* () {
            let exit = false;
            let opcaoEscolhida = yield um.menuInteracoes();
            let emojiEscolhido;
            switch (opcaoEscolhida) {
                case 1:
                    //curtir
                    emojiEscolhido = '👍';
                    const curtida = new Interacao_1.Interacao(emojiEscolhido, publicacao.id);
                    publicacao.adicionarInteracao(curtida);
                    this.adicionarInteracao(curtida);
                    li.adicionarInteracaoNoJson(curtida);
                    console.log("Curtida realizada com sucesso!");
                    break;
                case 2:
                    //não curtir
                    emojiEscolhido = '👎';
                    const naoCurtida = new Interacao_1.Interacao(emojiEscolhido, publicacao.id);
                    publicacao.adicionarInteracao(naoCurtida);
                    this.adicionarInteracao(naoCurtida);
                    li.adicionarInteracaoNoJson(naoCurtida);
                    console.log("Não curtida realizada com sucesso!");
                    break;
                case 3:
                    //risos
                    emojiEscolhido = '😂';
                    const risos = new Interacao_1.Interacao(emojiEscolhido, publicacao.id);
                    publicacao.adicionarInteracao(risos);
                    this.adicionarInteracao(risos);
                    li.adicionarInteracaoNoJson(risos);
                    console.log("Risos realizados com sucesso!");
                    break;
                case 4:
                    //surpresa
                    emojiEscolhido = '😲';
                    const surpresa = new Interacao_1.Interacao(emojiEscolhido, publicacao.id);
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
        });
    }
    //get de perfis
    getPerfis() {
        return this.perfis;
    }
    getPublicacoes() {
        return this.publicacoes;
    }
}
exports.App = App;
