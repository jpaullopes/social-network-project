import inquirer from "inquirer";

async function mainMenu() {
    while (true) {
        const resposta = await inquirer.prompt([
            {
                type: "list",
                name: "escolha",
                message: "O que deseja fazer?",
                choices: ["Gerenciar Perfis", "Gerenciar Publicações", "Sair"]
            }
        ]);

        if (resposta.escolha === "Sair") {
            console.log("Saindo...");
            break;
        } else if (resposta.escolha === "Gerenciar Perfis") {
            await gerenciarPerfis();
        } else if (resposta.escolha === "Gerenciar Publicações") {
            await gerenciarPublicacoes();
        }
    }
}

async function gerenciarPerfis() {
    console.log("Ações para perfis...");
}

async function gerenciarPublicacoes() {
    console.log("Ações para publicações...");
}

mainMenu();
