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
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const resposta = yield inquirer_1.default.prompt([
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
            }
            else if (resposta.escolha === "Gerenciar Perfis") {
                yield gerenciarPerfis();
            }
            else if (resposta.escolha === "Gerenciar Publicações") {
                yield gerenciarPublicacoes();
            }
        }
    });
}
function gerenciarPerfis() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Ações para perfis...");
    });
}
function gerenciarPublicacoes() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Ações para publicações...");
    });
}
mainMenu();
