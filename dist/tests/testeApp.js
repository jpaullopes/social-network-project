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
const inquirer_1 = __importDefault(require("inquirer"));
const app_1 = require("../models/app");
const Perfil_1 = require("../models/Perfil");
const PublicacaoAvancada_1 = require("../models/PublicacaoAvancada");
const Interacao_1 = require("../models/Interacao");
const app = new app_1.App();
// Função para testar o login
function testLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Login ===");
        const usuario = yield app.login();
        if (usuario) {
            console.log(`Login realizado com sucesso: ${usuario.nome}`);
        }
        else {
            console.log("Falha no login.");
        }
    });
}
function testListProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Listar Perfis ===");
        app.listarPerfis();
    });
}
function testListPublications() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Listar Publicações ===");
        app.listarPublicacoes();
    });
}
function testAddProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Adicionar e Cadastrar Perfil ===");
        const novoPerfil = new Perfil_1.Perfil("Teste", "teste@example.com", "senha123");
        app.adicionarPerfil(novoPerfil);
        app.escreverUsuarios();
        console.log("Após adicionar novo perfil:");
        app.listarPerfis();
    });
}
function testSimplePublication() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Publicação Simples ===");
        const perfil = app.getPerfis()[0];
        if (!perfil) {
            console.log("Nenhum perfil disponível.");
            return;
        }
        app.publicacaoSimples(perfil, "Esta é uma publicação simples de teste.");
        app.escreverPublicacoes();
        app.listarPublicacoes();
    });
}
function testAdvancedPublication() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Publicação Avançada ===");
        const perfil = app.getPerfis()[0];
        if (!perfil) {
            console.log("Nenhum perfil disponível.");
            return;
        }
        const interacaoTeste = new Interacao_1.Interacao("👍", perfil.id, "dummyId");
        app.publicacaoAvancada(perfil, "Esta é uma publicação avançada de teste.", [interacaoTeste]);
        app.escreverPublicacoes();
        app.listarPublicacoes();
    });
}
function testSearchProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Buscar Perfil por Nome ===");
        const { busca } = yield inquirer_1.default.prompt([
            {
                name: "busca",
                message: "Digite o nome do perfil para buscar:",
                type: "input"
            }
        ]);
        const perfilBuscado = app.buscarPerfilPorNome(busca);
        console.log(perfilBuscado ? `Perfil encontrado: ${perfilBuscado.nome}` : "Perfil não encontrado.");
    });
}
function testCheckAdvancedProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Verificar se Perfil é Avançado ===");
        const perfil = app.getPerfis()[0];
        if (!perfil) {
            console.log("Nenhum perfil disponível.");
            return;
        }
        console.log(`O perfil ${perfil.nome} é avançado?`, app.verificarPerfilAvancado(perfil));
    });
}
function testInteragirPublicacao() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Teste: Interagir em Publicação Avançada ===");
        // Procura por uma publicação avançada
        const pubAvancada = app.lerPublicacoes().find(pub => pub instanceof PublicacaoAvancada_1.PublicacaoAvancada);
        if (!pubAvancada) {
            console.log("Nenhuma publicação avançada encontrada. Criando uma nova...");
            const perfil = app.getPerfis()[0];
            if (!perfil) {
                console.log("Nenhum perfil disponível para criar publicação.");
                return;
            }
            app.publicacaoAvancada(perfil, "Publicação avançada para teste de interação", []);
            app.escreverPublicacoes();
        }
        const novaPubAvancada = app.lerPublicacoes().find(pub => pub instanceof PublicacaoAvancada_1.PublicacaoAvancada);
        if (novaPubAvancada) {
            console.log("Interaja na publicação:");
            yield app.interagirPublicacao(novaPubAvancada);
            console.log("Interações atualizadas:");
            app.exibirInteracoes(novaPubAvancada);
        }
    });
}
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        let exit = false;
        while (!exit) {
            const { opcao } = yield inquirer_1.default.prompt([
                {
                    name: "opcao",
                    type: "list",
                    message: "Escolha um teste para executar:",
                    choices: [
                        "Login",
                        "Listar Perfis",
                        "Listar Publicações",
                        "Adicionar Perfil",
                        "Publicação Simples",
                        "Publicação Avançada",
                        "Buscar Perfil",
                        "Verificar Perfil Avançado",
                        "Interagir em Publicação Avançada",
                        "Sair dos Testes"
                    ]
                }
            ]);
            switch (opcao) {
                case "Login":
                    yield testLogin();
                    break;
                case "Listar Perfis":
                    yield testListProfiles();
                    break;
                case "Listar Publicações":
                    yield testListPublications();
                    break;
                case "Adicionar Perfil":
                    yield testAddProfile();
                    break;
                case "Publicação Simples":
                    yield testSimplePublication();
                    break;
                case "Publicação Avançada":
                    yield testAdvancedPublication();
                    break;
                case "Buscar Perfil":
                    yield testSearchProfile();
                    break;
                case "Verificar Perfil Avançado":
                    yield testCheckAdvancedProfile();
                    break;
                case "Interagir em Publicação Avançada":
                    yield testInteragirPublicacao();
                    break;
                case "Sair dos Testes":
                    exit = true;
                    break;
                default:
                    break;
            }
        }
    });
}
console.log("=== Ambiente de Teste do App ===");
mainMenu();
