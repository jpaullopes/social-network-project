import * as um from "../utils/utils-menu/utilsMenu";
import { question } from "readline-sync";
import { pesquisaEmojis } from "../utils/utils-menu/utilsEmojis";
//escolha para qual menu deseja ir


console.log("1 - Menu Inicial");
console.log("2 - Menu Página Principal");
console.log("3 - Menu Interações");
console.log("4 - Menu Aba Amigos");
console.log("5 - Menu Gerenciar Perfis");
console.log("6 - Mensagem de Erro");
console.log("7 - Pesquisa de Emojis");

let choice = question("Escolha para qual menu deseja ir: ");

if(choice == "1"){
    um.menuInicial();
}
else if(choice == "2"){
    um.menuPaginaPrincipal(true);
}
else if(choice == "3"){
    um.menuInteracoes();
}
else if(choice == "4"){
    um.menuAbaAmigos();
}
else if(choice == "5"){
    um.menuGerenciarPerfis();
}
else if(choice == "6"){
    um.mensagemErro();
}
else if(choice == "7"){
    pesquisaEmojis();
}
else{
    console.log("Opção inválida");
}

