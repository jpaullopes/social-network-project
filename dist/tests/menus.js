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
Object.defineProperty(exports, "__esModule", { value: true });
const um = __importStar(require("../utils/utils-menu/utilsMenu"));
const readline_sync_1 = require("readline-sync");
const utilsEmojis_1 = require("../utils/utils-menu/utilsEmojis");
//escolha para qual menu deseja ir
console.log("1 - Menu Inicial");
console.log("2 - Menu Página Principal");
console.log("3 - Menu Interações");
console.log("4 - Menu Aba Amigos");
console.log("5 - Menu Gerenciar Perfis");
console.log("6 - Mensagem de Erro");
console.log("7 - Pesquisa de Emojis");
let choice = (0, readline_sync_1.question)("Escolha para qual menu deseja ir: ");
if (choice == "1") {
    um.menuInicial();
}
else if (choice == "2") {
    um.menuPaginaPrincipal(true);
}
else if (choice == "3") {
    um.menuInteracoes();
}
else if (choice == "4") {
    um.menuAbaAmigos();
}
else if (choice == "5") {
    um.menuGerenciarPerfis();
}
else if (choice == "6") {
    um.mensagemErro();
}
else if (choice == "7") {
    (0, utilsEmojis_1.pesquisaEmojis)();
}
else {
    console.log("Opção inválida");
}
