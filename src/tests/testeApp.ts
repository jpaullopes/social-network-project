import inquirer from "inquirer";
import { App } from "../models/app";

const app = new App();
console.log(app.getPerfis());

async function menu() {
    let exit = false;
    let perfil = null;
    do {
        const { opcao } = await inquirer.prompt([
            {
                name: "opcao",
                type: "list",
                message: "Selecione uma ação:",
                choices: [
                    "Login",
                    "Cadastrar usuário",
                    "Fazer publicação",
                    "Listar perfis",
                    "Listar publicações",
                    "Sair"
                ]
            }
        ]);

        switch (opcao) {
            case "Login":
                perfil = await app.login();
                console.log(perfil);
                break;
            case "Cadastrar usuário":
                await app.cadastrarUsuario();
                app.escreverUsuarios();
                break;
            case "Fazer publicação": //isso aqui so coloquei pra testar mas tem muita coisa pra trabalhar em cima
                const { nome, conteudo } = await inquirer.prompt([
                    {
                        name: "nome",
                        type: "input",
                        message: "Digite o nome do perfil:"
                    },
                    {
                        name: "conteudo",
                        type: "input",
                        message: "Digite o conteúdo da publicação:"
                    }
                ]);
                perfil = app.buscarPerfilPorNome(nome);
                if (perfil) {
                    app.fazerPublicacao(perfil, conteudo);
                    console.log("Publicação realizada.");
                } else {
                    console.log("Perfil não encontrado.");
                }
                app.escreverPublicacoes();
                break;
            case "Listar perfis":
                app.listarPerfis();
                break;
            case "Listar publicações":
                app.listarPublicacoes();
                break;
            case "Sair":
                exit = true;
                break;
            default:
                break;
        }
    } while (!exit);
}
console.log("Bem-vindo ao Simplee!");
menu();
