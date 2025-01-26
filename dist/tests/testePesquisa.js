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
const perfis = [
    { id: 1, nome: "joao123" },
    { id: 2, nome: "maria_s2" },
    { id: 3, nome: "carlos_rock" },
    { id: 4, nome: "ana_bella" },
    { id: 5, nome: "pedro_gamer" },
    { id: 6, nome: "lucas_fitness" },
    { id: 7, nome: "mariana_art" },
    { id: 8, nome: "fernanda_travel" },
    { id: 9, nome: "paulo_music" },
    { id: 10, nome: "clara_foodie" },
    { id: 11, nome: "ricardo_photography" },
    { id: 12, nome: "bia_books" },
    { id: 13, nome: "rafael_sports" },
    { id: 14, nome: "juliana_fashion" },
    { id: 15, nome: "gabriel_tech" },
    { id: 16, nome: "larissa_yoga" },
    { id: 17, nome: "felipe_travel" },
    { id: 18, nome: "patricia_cooking" },
    { id: 19, nome: "gustavo_fitness" },
    { id: 20, nome: "renata_art" },
    { id: 21, nome: "thiago_music" },
    { id: 22, nome: "camila_foodie" },
    { id: 23, nome: "bruno_photography" },
    { id: 24, nome: "aline_books" },
    { id: 25, nome: "eduardo_sports" },
    { id: 26, nome: "vanessa_fashion" },
    { id: 27, nome: "rodrigo_tech" },
    { id: 28, nome: "tatiana_yoga" },
    { id: 29, nome: "marcelo_travel" },
    { id: 30, nome: "simone_cooking" },
    { id: 31, nome: "andre_fitness" },
    { id: 32, nome: "carla_art" },
    { id: 33, nome: "leandro_music" },
    { id: 34, nome: "sabrina_foodie" },
    { id: 35, nome: "diego_photography" },
    { id: 36, nome: "natalia_books" },
    { id: 37, nome: "alexandre_sports" },
    { id: 38, nome: "roberta_fashion" },
    { id: 39, nome: "fabio_tech" },
    { id: 40, nome: "isabela_yoga" },
    { id: 41, nome: "henrique_travel" },
    { id: 42, nome: "daniela_cooking" },
    { id: 43, nome: "vitor_fitness" },
    { id: 44, nome: "luana_art" }
];
function buscarPerfil() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const resposta = yield inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "pesquisa",
                    message: "Digite o nome do perfil para busca (ou digite 'sair' para encerrar):",
                },
            ]);
            const pesquisa = resposta.pesquisa.toLowerCase();
            if (pesquisa === 'sair') {
                console.log("Encerrando a busca.");
                break;
            }
            // Filtra os perfis com base na pesquisa
            const resultados = perfis.filter(perfil => perfil.nome.toLowerCase().includes(pesquisa));
            if (resultados.length === 0) {
                console.log("Nenhum perfil encontrado.");
                continue;
            }
            // Cria uma lista de nomes para selecionar
            const escolhas = resultados.map(perfil => perfil.nome);
            escolhas.push('Sair');
            const { escolha } = yield inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "escolha",
                    message: "Selecione um perfil ou escolha 'Sair' para encerrar:",
                    choices: escolhas
                }
            ]);
            if (escolha === 'Sair') {
                console.log("Encerrando a busca.");
                break;
            }
            console.log(`Você selecionou o perfil: ${escolha}`);
        }
    });
}
buscarPerfil();
