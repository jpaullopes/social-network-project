import * as um from "../utils/utils-menu/utilsMenu";
import { question } from "readline-sync";
//escolha para qual menu deseja ir
let choice = question("Escolha para qual menu deseja ir: \n1 - Menu Inicial\n2 - Menu Página Principal\n3 - Menu Interações\n4 - Menu Aba Amigos\n");
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
else{
    console.log("Opção inválida");
}

