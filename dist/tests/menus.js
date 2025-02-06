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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const um = __importStar(require("../utils/utils-menu/utilsMenu"));
const readline_sync_1 = require("readline-sync");
const utilsEmojis_1 = require("../utils/utils-menu/utilsEmojis");
const chalk_1 = __importDefault(require("chalk"));
function exibirMenu() {
    console.clear();
    console.log(chalk_1.default.bold.yellow("=== Sistema de Teste de Menus ==="));
    console.log(chalk_1.default.blue("1 - Menu Inicial"));
    console.log(chalk_1.default.blue("2 - Menu Página Principal"));
    console.log(chalk_1.default.blue("3 - Menu Interações"));
    console.log(chalk_1.default.blue("4 - Menu Aba Amigos"));
    console.log(chalk_1.default.blue("5 - Menu Gerenciar Perfis"));
    console.log(chalk_1.default.blue("6 - Mensagem de Erro"));
    console.log(chalk_1.default.blue("7 - Pesquisa de Emojis"));
    console.log(chalk_1.default.blue("0 - Sair"));
}
function iniciar() {
    return __awaiter(this, void 0, void 0, function* () {
        let choice;
        do {
            exibirMenu();
            choice = (0, readline_sync_1.question)(chalk_1.default.green("Escolha para qual menu deseja ir: "));
            switch (choice) {
                case "1":
                    yield um.menuInicial();
                    break;
                case "2":
                    yield um.menuPaginaPrincipal(true);
                    break;
                case "3":
                    yield um.menuInteracoes();
                    break;
                case "4":
                    yield um.menuAbaAmigos();
                    break;
                case "5":
                    yield um.menuGerenciarPerfis();
                    break;
                case "6":
                    yield um.mensagemErro();
                    break;
                case "7":
                    yield (0, utilsEmojis_1.pesquisaEmojis)();
                    break;
                case "0":
                    console.log(chalk_1.default.red("Saindo..."));
                    break;
                default:
                    console.log(chalk_1.default.red("Opção inválida!"));
                    break;
            }
            if (choice !== "0") {
                (0, readline_sync_1.question)(chalk_1.default.green("Pressione Enter para continuar..."));
            }
        } while (choice !== "0");
    });
}
iniciar();
