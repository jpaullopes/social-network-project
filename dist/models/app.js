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
const utilsAuxiliaresMenu_1 = require("../utils/utils-menu/utilsAuxiliaresMenu");
const um = __importStar(require("../utils/utils-menu/utilsMenu")); //import de funções de menu
//import de leitura de arquivos
const lp = __importStar(require("../utils/utilsPublicacaoJson")); //responsavel pela leitur e escrita json de publicações
const lu = __importStar(require("../utils/utilsPerfilJson")); //responsavel pela leitur e escrita json de usuarios
const li = __importStar(require("../utils/utilsInteracaoJson")); //responsavel pela leitur e escrita json de interações
const utilsExibicoes_1 = require("../utils/utilsExibicoes");
const utilsEmojis_1 = require("../utils/utils-menu/utilsEmojis");
class App {
    constructor() {
        this.perfis = [];
        this.publicacoes = [];
        this.interacoes = []; //tem muita coisa sujeita a mudança aqui ó
        const usuariosData = lu.readJSONFile(lu.FILE_PATH);
        // When file is an array or an object with 'perfis' property, use the correct one.
        const perfisRaw = Array.isArray(usuariosData) ? usuariosData : (usuariosData.perfis || []);
        // Map each raw user object to a Perfil instance
        this.perfis = perfisRaw.map((p) => {
            if (p._tipo === 'pa') {
                return new PerfilAvancado_1.PerfilAvancado(p._nome, p._email, p._senha, p._fotoPerfil, p._descricao, p._tipo, p._amigos, p._pedidosAmizade, p._posts, p._id);
            }
            else {
                return new Perfil_1.Perfil(p._nome, p._email, p._senha, p._fotoPerfil, p._descricao, p._tipo, p._amigos, p._pedidosAmizade, p._posts, p._status, p._id);
            }
        });
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
        this.interacoes = interacoesRaw.map((i) => new Interacao_1.Interacao(i._tipo, i._idPublicacao, i._autorPublicacao, i._id));
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
    recarregarDados() {
        // Recarrega os perfis
        const usuariosData = lu.readJSONFile(lu.FILE_PATH);
        const perfisRaw = Array.isArray(usuariosData) ? usuariosData : (usuariosData.perfis || []);
        this.perfis = perfisRaw.map((p) => {
            if (p._tipo === 'pa') {
                return new PerfilAvancado_1.PerfilAvancado(p._nome, p._email, p._senha, p._fotoPerfil, p._descricao, p._tipo, p._amigos, p._pedidosAmizade, p._posts, p._id);
            }
            else {
                return new Perfil_1.Perfil(p._nome, p._email, p._senha, p._fotoPerfil, p._descricao, p._tipo, p._amigos, p._pedidosAmizade, p._posts, p._status, p._id);
            }
        });
        // Recarrega as publicações
        const pubsData = lp.readJSONFile(lp.FILE_PATH);
        const pubsRaw = Array.isArray(pubsData) ? pubsData : (pubsData.publicacoes || []);
        this.publicacoes = pubsRaw.map((pub) => {
            if (pub._tipo === 'pa') {
                return new PublicacaoAvancada_1.PublicacaoAvancada(pub._conteudo, pub._perfilDoAutor, pub._listaDeInteracao, pub._tipo, pub._dataDePublicacao, pub._id);
            }
            else {
                return new Publicacao_1.Publicacao(pub._conteudo, pub._perfilDoAutor, pub._tipo, pub._dataDePublicacao, pub._id);
            }
        });
        // Recarrega as interações
        const interacoesData = li.readJSONFile(li.FILE_PATH);
        const interacoesRaw = Array.isArray(interacoesData) ? interacoesData : (interacoesData.interacoes || []);
        this.interacoes = interacoesRaw.map((i) => new Interacao_1.Interacao(i._tipo, i._idPublicacao, i._autorPublicacao, i._id));
        // Refaz as ligações entre interações, publicações e perfis
        this.linkarDados();
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
    async listarPublicacoes() {
        this.publicacoes.forEach(publicacao => {
            publicacao.exibirPublicacao();
        });
    }
    //Lista todas as interações registradas. | mesma coisa de acima
    listarInteracoes() {
        this.interacoes.forEach(interacao => {
            interacao.exibirInteracao();
        });
    }
    //metodo que retorna um perfil com base no nome
    buscarPerfilPorNome(nome) {
        const nomeFormatado = String(nome).trim().toLowerCase();
        return this.perfis.find(perfil => String(perfil.nome).trim().toLowerCase() === nomeFormatado);
    }
    //metodo que retorna o nome do perfil que fez uma publicação
    buscarPerfilPorPublicacao(publicacao) {
        return this.perfis.find(perfil => perfil.nome === publicacao.perfilDoAutor);
    }
    //metodo que retorna um array de publicações realizadas por um perfil
    buscarPublicacoesPorPerfil(perfil) {
        return this.publicacoes.filter(publicacao => publicacao.perfilDoAutor === perfil.nome);
    }
    //metodo que busca uma publicação com base no id
    buscarPublicacaoPorId(id) {
        return this.publicacoes.find(publicacao => publicacao.id === id);
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
    //metodo que realiza o cadastro do usuario // AINDA EM DESENVOLVIMENTO
    async cadastrarUsuario(adm = false) {
        const titulo = "Cadastro de Usuário";
        let respostas;
        let nomeExistente = false;
        let emailExistente = false;
        //exibir o menu de cadastro
        (0, utilsAuxiliaresMenu_1.displayHeader)(titulo);
        do {
            respostas = await inquirer_1.default.prompt([
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
        let novoPerfil = new Perfil_1.Perfil(respostas.nome, respostas.email, respostas.senha);
        if (adm) {
            novoPerfil = new PerfilAvancado_1.PerfilAvancado(respostas.nome, respostas.email, respostas.senha);
        }
        this.perfis.push(novoPerfil);
        lu.adicionarPerfilNoJson(novoPerfil);
    }
    //metodo que erá o login do user ,  metodo precisa retornar o usuario logado
    async login() {
        const titulo = "Login";
        let respostas;
        let usuarioExistente = false;
        let senhaCorreta = false;
        //exibir o menu de login
        (0, utilsAuxiliaresMenu_1.displayHeader)(titulo);
        respostas = await inquirer_1.default.prompt([
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
        if (usuarioExistente && senhaCorreta && userExiste) {
            return userExiste;
        }
        return undefined;
        //funcionou certinho até agora
    }
    //metedo vai fazer a publicação e com um parametro ele vai fazer a publicação avançada
    async fazerPublicacao(perfil, avancado = false) {
        const { conteudo } = await inquirer_1.default.prompt([
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
            this.publicacaoSimples(perfil, conteudo); // Alteração realizada
        }
    }
    //metodo que verifica se o tipo de perfil é ou não avançado
    verificarPerfilAvancado(perfil) {
        return perfil.tipo === 'pa';
    }
    //metodo que exibe as interações de uma publicação avançada | vamo considerar que só de avançada
    exibirInteracoes(publicacao) {
        console.log("=== Interações da Publicação ===");
        publicacao.getInteracoes().forEach(interacao => {
            interacao.exibirInteracao();
        });
    }
    //aqui vai ficar a metodo que interage com o menu de interações na publicação avançada
    //vou fazer só o grosso aqui, depois a gente ajeita
    async interagirPublicacao(publicacao, perfilInterator) {
        let exit = false;
        let opcaoEscolhida = await um.menuInteracoes(publicacao);
        let emojiEscolhido;
        let interator = perfilInterator.nome;
        switch (opcaoEscolhida) {
            case 1:
                //curtir
                emojiEscolhido = '👍';
                const curtida = new Interacao_1.Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(curtida);
                this.adicionarInteracao(curtida);
                li.adicionarInteracaoNoJson(curtida);
                console.log("Curtida realizada com sucesso!");
                break;
            case 2:
                //não curtir
                emojiEscolhido = '👎';
                const naoCurtida = new Interacao_1.Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(naoCurtida);
                this.adicionarInteracao(naoCurtida);
                li.adicionarInteracaoNoJson(naoCurtida);
                console.log("Não curtida realizada com sucesso!");
                break;
            case 3:
                //risos
                emojiEscolhido = '😂';
                const risos = new Interacao_1.Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(risos);
                this.adicionarInteracao(risos);
                li.adicionarInteracaoNoJson(risos);
                console.log("Risos realizados com sucesso!");
                break;
            case 4:
                //surpresa
                emojiEscolhido = '😲';
                const surpresa = new Interacao_1.Interacao(emojiEscolhido, publicacao.id, interator);
                publicacao.adicionarInteracao(surpresa);
                this.adicionarInteracao(surpresa);
                li.adicionarInteracaoNoJson(surpresa);
                console.log("Surpresa realizada com sucesso!");
                break;
            case 0:
                exit = true;
                break;
            default:
                console.log("Opção inválida.");
                break;
        }
    }
    //modifique a função buscarPerfil para retornar o nome selecionado diretamente
    async buscarPerfil(usuarioAtual) {
        const nomeSelecionado = await um.buscarPerfil(this.perfis, usuarioAtual);
        const perfil = this.buscarPerfilPorNome(nomeSelecionado);
        return perfil;
    }
    //metodo que chama o menu de alteração de descrição 
    async alterarDescricaoPerfil(perfil) {
        let novaDescricao = await um.alterarDescricao();
        perfil.descricao = novaDescricao;
        lu.alterarDescricaoPerfil(perfil.nome, novaDescricao);
    }
    async menuFeed() {
        try {
            (0, utilsAuxiliaresMenu_1.displayHeader)('FEED');
            const opcoes = [
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Filtrar Publicações'), value: 1 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Interagir com Publicações'), value: 2 },
                { name: (0, utilsAuxiliaresMenu_1.centerText)('Voltar'), value: 0 },
            ];
            this.listarPublicacoes();
            const resposta = await (0, utilsAuxiliaresMenu_1.generalizarMenus)(opcoes);
            return resposta;
        }
        catch (error) {
            console.error("Erro no menuFeed:", error);
            return null;
        }
    }
    //filtra as publicações avançadas da rede social , ele vai excluir as publicações do perfil que está logado, então ele não vai poder interagir
    filtrarPublicacoesAvancadas(perfil) {
        return this.publicacoes.filter(publicacao => publicacao.tipo === 'pa' && publicacao.perfilDoAutor !== perfil.nome);
    }
    //aba feed avai exibir de forma interativa o array de publicações, e depois que for selecionada que nem um men comum ele vai retornar a publicação avançada e as interaçoes dela , vamos usar o inqueirer para isso
    /**
     * Exibe as publicações interativamente, utilizando o método exibirPublicacao de cada uma.
     * Após exibir todas, apresenta um menu para o usuário escolher uma publicação para interagir.
     */
    async exibirPublicacoesInterativas(publicacoes) {
        (0, utilsAuxiliaresMenu_1.displayHeader)("Publicações Disponíveis");
        const opcoes = publicacoes.map(publicacao => ({
            name: publicacao.getExibicaoFormatada(true),
            value: publicacao
        }));
        const terminalHeight = process.stdout.rows || 40;
        // Calcula a altura de cada publicação sem contar a opção "Voltar"
        const alturas = publicacoes.map(pub => pub.getExibicaoFormatada().split('\n').length);
        const maxAltura = Math.max(...alturas, 1);
        const pageSize = Math.max(3, Math.floor(terminalHeight / maxAltura)) * 8;
        opcoes.push({ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null });
        const { publicacaoEscolhida } = await inquirer_1.default.prompt([
            {
                name: 'publicacaoEscolhida',
                message: (0, utilsAuxiliaresMenu_1.centerText)('Escolha uma publicação para interagir:'),
                type: 'list',
                choices: opcoes,
                pageSize,
                loop: false,
            }
        ]);
        return publicacaoEscolhida;
    }
    //metodo que lista os amigos de um perfil
    async listarAmigos(perfil) {
        perfil.amigos.forEach(element => {
            const amigoPerfil = this.buscarPerfilPorNome(element);
            if (amigoPerfil) {
                (0, utilsExibicoes_1.exibirAmigosPerfil)(amigoPerfil);
            }
        });
        //aqui fica o inquerir esperando o enter da pessoa pra voltar
        let esperar = inquirer_1.default.prompt([
            {
                name: "enter",
                message: "Pressione ENTER para voltar a aba de amigos",
                type: "input"
            }
        ]);
    }
    //metodo que faz a solicitação de amizade
    fazerPedidoAmizade(perfil, amigo) {
        // Garante que 'amigo' seja uma instância de Perfil
        if (typeof amigo.adicionarPedidosAmizade !== 'function') {
            Object.setPrototypeOf(amigo, Object.getPrototypeOf(new Perfil_1.Perfil("", "", "")));
        }
        //verificado r para ver ou se o pedido de amizade foi enviado ou se já é amigo
        if (perfil.pedidosAmizade.includes(amigo.nome) || perfil.amigos.includes(amigo.nome)) {
            return;
        }
        amigo.adicionarPedidosAmizade(perfil.nome);
        lu.adicionarPedidoAmizade(perfil.nome, amigo.nome);
    }
    aceitarPedidoAmizade(perfil, amigo) {
        perfil.removerPedidoAmizade(amigo.nome);
        perfil.adicionarAmigo(amigo.nome);
        amigo.adicionarAmigo(perfil.nome);
        lu.aceitarPedidoAmizade(perfil.nome, amigo.nome);
    }
    listarPerfis() {
        this.perfis.forEach(perfil => {
            console.log(perfil.exibirPerfilFormatado());
        });
    }
    //listar perfis com dados completos
    listarPerfisCompleto(exibir = false) {
        this.perfis.forEach(perfil => {
            console.log(perfil.exibirPerfilCompleto(exibir));
        });
    }
    /**
     * Linka as interações com as publicações e adiciona o id da publicação
     * ao perfil do autor.
    */
    linkarDados() {
        // Linkar interações nas publicações avançadas (baseadas no id)
        this.interacoes.forEach(interacao => {
            //pra cada interação ele vai e busca o a publicação com base no id dela
            const publicacao = this.buscarPublicacaoPorId(interacao.idPublicacao);
            if (publicacao) {
                // Correção: só adiciona se a interação ainda não estiver presente
                if (!publicacao.getInteracoes().some((i) => i.id === interacao.id)) {
                    publicacao.adicionarInteracao(interacao);
                }
            }
        });
        // Linkar publicações aos perfis (adiciona o id da publicação ao array _posts)
        this.publicacoes.forEach(pub => {
            const perfil = this.buscarPerfilPorNome(pub.perfilDoAutor);
            if (perfil) {
                if (!perfil.posts.includes(pub.id)) {
                    // Acessa o array de posts e insere o id da publicação
                    perfil.posts.push(pub.id);
                }
            }
        });
    }
    //metodo que exibe os pedidos de amizade de um perfil como checkbox e então com o array de amigos aceito ele vai aceitar
    async exibirPedidosAmizade(perfil) {
        (0, utilsAuxiliaresMenu_1.displayHeader)("Pedidos de Amizade");
        const pedidos = perfil.pedidosAmizade;
        const opcoes = pedidos.map(pedido => {
            var _a;
            return ({
                name: ((_a = this.buscarPerfilPorNome(pedido)) === null || _a === void 0 ? void 0 : _a.exibirComoAmigo()) || "",
                value: pedido
            });
        });
        opcoes.push({ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: "voltar" });
        const { pedidoAceito } = await inquirer_1.default.prompt([
            {
                name: 'pedidoAceito',
                message: 'Escolha um pedido de amizade para aceitar:',
                type: 'list',
                choices: opcoes,
                pageSize: 30
            }
        ]);
        if (pedidoAceito) {
            const perfilPedido = this.buscarPerfilPorNome(pedidoAceito);
            if (perfilPedido) {
                this.aceitarPedidoAmizade(perfil, perfilPedido);
            }
        }
    }
    //filtrar publicaçoes por autor
    filtrarPublicacoesPorAutor(perfil) {
        return this.publicacoes.filter(publicacao => publicacao.perfilDoAutor === perfil.nome);
    }
    // Novo método para exibir os amigos de forma interativa
    async exibirAmigosInterativos(perfil, paraRemover = false) {
        (0, utilsAuxiliaresMenu_1.displayHeader)("Amigos");
        // Monta a lista de amigos a partir dos nomes
        const amigos = perfil.amigos
            .map(nome => this.buscarPerfilPorNome(nome))
            .filter((amigo) => amigo !== undefined);
        const opcoes = amigos.map(amigo => ({
            name: amigo.exibirComoAmigo(),
            value: amigo
        }));
        opcoes.push({ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null });
        let mensagem = "Selecione um amigo:";
        if (paraRemover) {
            mensagem = "Selecione um amigo para remover:";
        }
        const { amigoSelecionado } = await inquirer_1.default.prompt([
            {
                name: "amigoSelecionado",
                type: "list",
                message: (0, utilsAuxiliaresMenu_1.centerText)(mensagem),
                choices: opcoes,
                pageSize: 30
            }
        ]);
        return amigoSelecionado;
    }
    //metodo que altera a senha de um perfil
    async alterarSenha(perfil) {
        const { novaSenha } = await inquirer_1.default.prompt([
            {
                name: "novaSenha",
                message: "Digite a nova senha:",
                type: "password",
                mask: "*",
                validate: (input) => {
                    if (input.length < 6) {
                        return "A senha deve ter pelo menos 6 caracteres.";
                    }
                    if (input === perfil.senha) {
                        return "A nova senha deve ser diferente da senha atual.";
                    }
                    return true;
                }
            }
        ]);
        perfil.senha = novaSenha;
        lu.alterarSenhaPerfil(perfil.nome, novaSenha);
    }
    //metodo que remove o amigo de um perfil
    async removerAmigo(perfil) {
        const amigo = await this.exibirAmigosInterativos(perfil, true);
        if (amigo) {
            perfil.removerAmigo(amigo.nome);
            lu.removerAmigo(perfil.nome, amigo.nome);
        }
    }
    //metodo que altera a descrição de um perfil
    async alternarStatusPorFiltro(ativos) {
        // Filtra os perfis de acordo com o parâmetro: se ativos for true, mostra apenas perfis ativos,
        // caso contrário, mostra apenas perfis desativados.
        const perfisFiltrados = this.perfis.filter(perfil => perfil.status === ativos);
        let titulo = ativos ? "Desativar Perfil" : "Ativar Perfil";
        (0, utilsAuxiliaresMenu_1.displayHeader)(titulo);
        // Se nenhum perfil for encontrado, exibe um menu apenas com a opção "Voltar"
        if (perfisFiltrados.length === 0) {
            console.log((0, utilsAuxiliaresMenu_1.centerText)("Nenhum perfil disponível para alteração de status."));
            await inquirer_1.default.prompt([
                {
                    name: "voltar",
                    type: "list",
                    message: (0, utilsAuxiliaresMenu_1.centerText)("Selecione a opção para voltar:"),
                    choices: [{ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null }],
                    pageSize: 10
                }
            ]);
            return;
        }
        // Cria as opções para o menu usando o método exibirPerfilCompleto para formatar cada perfil.
        const opcoes = perfisFiltrados.map(perfil => ({
            name: perfil.exibirPerfilCompleto(),
            value: perfil
        }));
        // Adiciona a opção de sair.
        opcoes.push({ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null });
        // Exibe o menu de seleção.
        const { perfilSelecionado } = await inquirer_1.default.prompt([
            {
                name: "perfilSelecionado",
                type: "list",
                message: (0, utilsAuxiliaresMenu_1.centerText)("Selecione um perfil para alterar seu status:"),
                choices: opcoes,
                pageSize: 30
            }
        ]);
        // Se o usuário optar por voltar, não faz nada.
        if (!perfilSelecionado)
            return;
        // Altera o status do perfil selecionado para o valor inverso do filtro passado.
        // Se o filtro era para exibir os ativos (ativos === true), o perfil selecionado será desativado (status false)
        // e vice-versa.
        perfilSelecionado.status = !ativos;
        lu.alterarStatusPerfil(perfilSelecionado.nome, perfilSelecionado.status);
    }
    //metodo que vai listar os perfis de completos com uma getbox no final
    async exibirListaPerfisCompleto() {
        (0, utilsAuxiliaresMenu_1.displayHeader)("Lista de Perfis");
        // Lista os perfis com todas as informações utilizando o método existente
        this.listarPerfisCompleto(true);
        // Exibe um prompt com apenas a opção "Voltar"
        await inquirer_1.default.prompt([
            {
                name: "voltar",
                type: "list",
                message: (0, utilsAuxiliaresMenu_1.centerText)("Pressione para voltar:"),
                choices: [{ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null }],
                pageSize: 30
            }
        ]);
    }
    //metodo que exibe a lista de publicações de forma completa
    async exibirListaPublicacoesCompleto() {
        (0, utilsAuxiliaresMenu_1.displayHeader)("PUBLICAÇÕES");
        if (this.publicacoes.length === 0) {
            console.log((0, utilsAuxiliaresMenu_1.centerText)("Nenhuma publicação encontrada."));
        }
        else {
            // Exibe cada publicação usando seu método de exibição formatada
            this.publicacoes.forEach(publicacao => {
                console.log(publicacao.getExibicaoFormatada());
            });
        }
        // Exibe um prompt com apenas a opção "Voltar"
        await inquirer_1.default.prompt([
            {
                name: "voltar",
                type: "list",
                message: (0, utilsAuxiliaresMenu_1.centerText)("Selecione a opção para voltar:"),
                choices: [{ name: (0, utilsExibicoes_1.getBoxVoltar)(), value: null }],
                pageSize: 10
            }
        ]);
    }
    //alterar foto de perfilll
    //metodo que altera a foto de perfil
    //minha sanidade já oi pro saco
    async alterarFotoPerfil(perfil) {
        const novaFoto = await (0, utilsEmojis_1.pesquisaEmojis)();
        if (novaFoto) {
            perfil.foto = novaFoto;
            lu.alterarFotoPerfil(perfil.nome, novaFoto);
        }
    }
    //get de perfis
    getPerfis() {
        return this.perfis;
    }
    getPublicacoes() {
        return this.publicacoes;
    }
    getInteracoes() {
        return this.interacoes;
    }
}
exports.App = App;
