import inquirer from "inquirer";
import { App } from "../models/app";
import { Perfil } from "../models/Perfil";
import { PublicacaoAvancada } from "../models/PublicacaoAvancada";
import { Interacao } from "../models/Interacao";

const app = new App();

// Função para testar o login
async function testLogin(): Promise<void> {
    console.log("\n=== Teste: Login ===");
    const usuario = await app.login();
    if (usuario) {
        console.log(`Login realizado com sucesso: ${usuario.nome}`);
    } else {
        console.log("Falha no login.");
    }
}

async function testListProfiles(): Promise<void> {
    console.log("\n=== Teste: Listar Perfis ===");
    app.listarPerfis();
}

async function testListPublications(): Promise<void> {
    console.log("\n=== Teste: Listar Publicações ===");
    app.listarPublicacoes();
}

async function testAddProfile(): Promise<void> {
    console.log("\n=== Teste: Adicionar e Cadastrar Perfil ===");
    const novoPerfil = new Perfil("Teste", "teste@example.com", "senha123");
    app.adicionarPerfil(novoPerfil);
    app.escreverUsuarios();
    console.log("Após adicionar novo perfil:");
    app.listarPerfis();
}

async function testSimplePublication(): Promise<void> {
    console.log("\n=== Teste: Publicação Simples ===");
    const perfil = app.getPerfis()[0];
    if (!perfil) {
        console.log("Nenhum perfil disponível.");
        return;
    }
    app.publicacaoSimples(perfil, "Esta é uma publicação simples de teste.");
    app.escreverPublicacoes();
    app.listarPublicacoes();
}

async function testAdvancedPublication(): Promise<void> {
    console.log("\n=== Teste: Publicação Avançada ===");
    const perfil = app.getPerfis()[0];
    if (!perfil) {
        console.log("Nenhum perfil disponível.");
        return;
    }
    const interacaoTeste = new Interacao("👍", perfil.id, "dummyId");
    app.publicacaoAvancada(perfil, "Esta é uma publicação avançada de teste.", [interacaoTeste]);
    app.escreverPublicacoes();
    app.listarPublicacoes();
}

async function testSearchProfile(): Promise<void> {
    console.log("\n=== Teste: Buscar Perfil por Nome ===");
    const { busca } = await inquirer.prompt([
        {
            name: "busca",
            message: "Digite o nome do perfil para buscar:",
            type: "input"
        }
    ]);
    const perfilBuscado = app.buscarPerfilPorNome(busca);
    console.log(perfilBuscado ? `Perfil encontrado: ${perfilBuscado.nome}` : "Perfil não encontrado.");
}

async function testCheckAdvancedProfile(): Promise<void> {
    console.log("\n=== Teste: Verificar se Perfil é Avançado ===");
    const perfil = app.getPerfis()[0];
    if (!perfil) {
        console.log("Nenhum perfil disponível.");
        return;
    }
    console.log(`O perfil ${perfil.nome} é avançado?`, app.verificarPerfilAvancado(perfil));
}

async function testInteragirPublicacao(): Promise<void> {
    console.log("\n=== Teste: Interagir em Publicação Avançada ===");
    // Procura por uma publicação avançada
    const pubAvancada = app.lerPublicacoes().find(pub => pub instanceof PublicacaoAvancada) as PublicacaoAvancada;
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
    const novaPubAvancada = app.lerPublicacoes().find(pub => pub instanceof PublicacaoAvancada) as PublicacaoAvancada;
    if (novaPubAvancada) {
        console.log("Interaja na publicação:");
        await app.interagirPublicacao(novaPubAvancada);
        console.log("Interações atualizadas:");
        app.exibirInteracoes(novaPubAvancada);
    }
}

async function mainMenu(): Promise<void> {
    let exit = false;
    while (!exit) {
        const { opcao } = await inquirer.prompt([
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
                await testLogin();
                break;
            case "Listar Perfis":
                await testListProfiles();
                break;
            case "Listar Publicações":
                await testListPublications();
                break;
            case "Adicionar Perfil":
                await testAddProfile();
                break;
            case "Publicação Simples":
                await testSimplePublication();
                break;
            case "Publicação Avançada":
                await testAdvancedPublication();
                break;
            case "Buscar Perfil":
                await testSearchProfile();
                break;
            case "Verificar Perfil Avançado":
                await testCheckAdvancedProfile();
                break;
            case "Interagir em Publicação Avançada":
                await testInteragirPublicacao();
                break;
            case "Sair dos Testes":
                exit = true;
                break;
            default:
                break;
        }
    }
}

console.log("=== Ambiente de Teste do App ===");
mainMenu();
