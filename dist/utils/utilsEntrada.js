"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarUsuario = cadastrarUsuario;
const inquirer_1 = __importDefault(require("inquirer"));
//função que realiza o cadastro do usuario
async function cadastrarUsuario() {
    const respostas = await inquirer_1.default.prompt([
        {
            name: "nome",
            message: "Digite seu nome:",
            type: "input",
        },
        {
            name: "email",
            message: "Digite seu email:",
            type: "input",
        },
        {
            name: "senha",
            message: "Digite sua senha:",
            type: "password",
        },
    ]);
    console.log("Usuário cadastrado com sucesso!");
    console.log(respostas);
}
