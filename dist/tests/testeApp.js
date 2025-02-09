"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const App_1 = require("../models/App");
function isPublicacaoAvancada(pub) {
    // Verifica se o objeto possui uma propriedade ou método exclusivo de PublicacaoAvancada
    return pub.adicionarInteracao !== undefined;
}
const app = new App_1.App();
console.log(app.getPublicacoes());
async function mainMenu() {
    let exit = false;
    while (!exit) {
        const { opcao } = await inquirer_1.default.prompt([
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
            case "Login": {
                const perfilLogado = await app.login();
                if (perfilLogado) {
                    console.log(`Login realizado com sucesso! Seja bem-vindo(a), ${perfilLogado.nome}.`);
                }
                else {
                    console.log("Falha no login. Verifique suas credenciais.");
                }
                break;
            }
            case "Listar Perfis": {
                app.listarPerfis();
                break;
            }
            case "Listar Publicações": {
                app.listarPublicacoes();
                break;
            }
            case "Adicionar Perfil": {
                await app.cadastrarUsuario();
                break;
            }
            case "Publicação Simples": {
                // Realiza login para identificar o perfil que irá publicar
                const perfilPublicador = await app.login();
                if (perfilPublicador) {
                    const { conteudo } = await inquirer_1.default.prompt([
                        {
                            name: "conteudo",
                            message: "Digite o conteúdo da publicação simples:",
                            type: "input"
                        }
                    ]);
                    app.publicacaoSimples(perfilPublicador, conteudo);
                    console.log("Publicação simples realizada com sucesso!");
                }
                else {
                    console.log("Você precisa efetuar o login para realizar uma publicação.");
                }
                break;
            }
            case "Publicação Avançada": {
                // Realiza login para identificar o perfil que irá publicar
                const perfilPublicador = await app.login();
                if (perfilPublicador) {
                    const { conteudo } = await inquirer_1.default.prompt([
                        {
                            name: "conteudo",
                            message: "Digite o conteúdo da publicação avançada:",
                            type: "input"
                        }
                    ]);
                    // Neste exemplo, a lista de interações inicia vazia
                    app.publicacaoAvancada(perfilPublicador, conteudo, []);
                    console.log("Publicação avançada realizada com sucesso!");
                }
                else {
                    console.log("Você precisa efetuar o login para realizar uma publicação.");
                }
                break;
            }
            case "Buscar Perfil": {
                const { nome } = await inquirer_1.default.prompt([
                    {
                        name: "nome",
                        message: "Digite o nome do perfil para buscar:",
                        type: "input"
                    }
                ]);
                const perfilEncontrado = app.buscarPerfilPorNome(nome);
                if (perfilEncontrado) {
                    console.log("=== Perfil Encontrado ===");
                    console.log(`ID: ${perfilEncontrado.id}`);
                    console.log(`Nome: ${perfilEncontrado.nome}`);
                    console.log(`Email: ${perfilEncontrado.email}`);
                    console.log(`Descrição: ${perfilEncontrado.descricao}`);
                }
                else {
                    console.log("Perfil não encontrado.");
                }
                break;
            }
            case "Verificar Perfil Avançado": {
                const perfilVerificar = await app.login();
                if (perfilVerificar) {
                    if (app.verificarPerfilAvancado(perfilVerificar)) {
                        console.log("Este perfil é avançado.");
                    }
                    else {
                        console.log("Este perfil não é avançado.");
                    }
                }
                else {
                    console.log("Você precisa efetuar o login para verificar o perfil.");
                }
                break;
            }
            case "Interagir em Publicação Avançada": {
                // Filtra apenas as publicações avançadas
                const publicacoesAvancadas = app.getPublicacoes().filter(isPublicacaoAvancada);
                if (publicacoesAvancadas.length === 0) {
                    console.log("Não há publicações avançadas disponíveis para interagir.");
                }
                else {
                    console.log("=== Publicações Avançadas Disponíveis ===");
                    publicacoesAvancadas.forEach(pub => {
                        console.log(`ID: ${pub.id} | Conteúdo: ${pub.conteudo}`);
                    });
                    const { pubId } = await inquirer_1.default.prompt([
                        {
                            name: "pubId",
                            message: "Digite o ID da publicação avançada na qual deseja interagir:",
                            type: "input"
                        }
                    ]);
                    const publicacaoSelecionada = publicacoesAvancadas.find(pub => pub.id == pubId);
                    if (publicacaoSelecionada) {
                        //await app.interagirPublicacao(publicacaoSelecionada,  ); //kkkkkkk ajeita ai parsa
                    }
                    else {
                        console.log("Publicação não encontrada com o ID informado.");
                    }
                }
                break;
            }
            case "Sair dos Testes": {
                exit = true;
                console.log("Encerrando os testes...");
                break;
            }
            default: {
                console.log("Opção inválida.");
                break;
            }
        }
    }
}
console.log("=== Ambiente de Teste do App ===");
mainMenu();
