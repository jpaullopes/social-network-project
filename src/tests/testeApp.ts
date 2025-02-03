import inquirer from "inquirer";
import { App } from "../models/app";

const app = new App();

async function menu() {
    let exit = false;
    do {
        const { opcao } = await inquirer.prompt([
            {
                name: "opcao",
                type: "list",
                message: "Selecione uma ação:",
                choices: [
                    "Cadastrar usuário",
                    "Fazer publicação",
                    "Listar perfis",
                    "Listar publicações",
                    "Sair"
                ]
            }
        ]);

        switch (opcao) {
            case "Cadastrar usuário":
                // Cadastrar usuário via prompt
                await app.cadastrarUsuario();
                break;
            case "Fazer publicação":
                // Seleciona perfil existente e publica conteúdo simples
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
                const perfil = app.buscarPerfilPorNome(nome);
                if (perfil) {
                    app.fazerPublicacao(perfil, conteudo);
                    console.log("Publicação realizada.");
                } else {
                    console.log("Perfil não encontrado.");
                }
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
