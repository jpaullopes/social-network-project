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
const app_1 = require("../models/app");
const app = new app_1.App();
console.log(app.getPerfis());
function menu() {
    return __awaiter(this, void 0, void 0, function* () {
        let exit = false;
        let perfil = null;
        do {
            const { opcao } = yield inquirer_1.default.prompt([
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
                    perfil = yield app.login();
                    console.log(perfil);
                    break;
                case "Cadastrar usuário":
                    yield app.cadastrarUsuario();
                    app.escreverUsuarios();
                    break;
                case "Fazer publicação": //isso aqui so coloquei pra testar mas tem muita coisa pra trabalhar em cima
                    const { nome, conteudo } = yield inquirer_1.default.prompt([
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
                    }
                    else {
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
    });
}
console.log("Bem-vindo ao Simplee!");
menu();
