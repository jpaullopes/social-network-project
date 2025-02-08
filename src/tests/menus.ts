import * as um from "../utils/utils-menu/utilsMenu";
import { question } from "readline-sync";
import { pesquisaEmojis } from "../utils/utils-menu/utilsEmojis";
import chalk from "chalk";

function exibirMenu(): void {
  console.clear();
  console.log(chalk.bold.yellow("=== Sistema de Teste de Menus ==="));
  console.log(chalk.blue("1 - Menu Inicial"));
  console.log(chalk.blue("2 - Menu Página Principal"));
  console.log(chalk.blue("3 - Menu Interações"));
  console.log(chalk.blue("4 - Menu Aba Amigos"));
  console.log(chalk.blue("5 - Menu Gerenciar Perfis"));
  console.log(chalk.blue("6 - Mensagem de Erro"));
  console.log(chalk.blue("7 - Pesquisa de Emojis"));
  console.log(chalk.blue("0 - Sair"));
}

async function iniciar(): Promise<void> {
  let choice: string;
  do {
    exibirMenu();
    choice = question(chalk.green("Escolha para qual menu deseja ir: "));
    
    switch(choice) {
      case "1":
        await um.menuInicial();
        break;
      case "2":
        //await um.menuPaginaPrincipal(true);
        break;
      case "3":
        //await um.menuInteracoes();
        break;
      case "4":
        //await um.menuAbaAmigos();
        break;
      case "5":
        // um.menuGerenciarPerfis();
        break;
      case "6":
        await um.mensagemErro();
        break;
      case "7":
        await pesquisaEmojis();
        break;
      case "0":
        console.log(chalk.red("Saindo..."));
        break;
      default:
        console.log(chalk.red("Opção inválida!"));
        break;
    }
    
    if (choice !== "0") {
      question(chalk.green("Pressione Enter para continuar..."));
    }
  } while (choice !== "0");
}

iniciar();