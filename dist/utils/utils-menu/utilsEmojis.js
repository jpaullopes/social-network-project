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
exports.emojiList = void 0;
exports.pesquisaEmojis = pesquisaEmojis;
const inquirer_1 = __importDefault(require("inquirer"));
//tem os emojis e seus respectivos nomes para serem usados
exports.emojiList = [
    { emoji: '👍', name: 'polegar para cima' },
    { emoji: '❤️', name: 'coração' },
    { emoji: '😂', name: 'rindo' },
    { emoji: '😯', name: 'surpreso' },
    { emoji: '😢', name: 'chorando' },
    { emoji: '😡', name: 'bravo' },
    { emoji: '👎', name: 'polegar para baixo' },
    { emoji: '😲', name: 'espantado' },
    { emoji: '🔥', name: 'fogo' },
    { emoji: '🎉', name: 'festa' },
    { emoji: '😍', name: 'apaixonado' },
    { emoji: '😎', name: 'óculos escuros' },
    { emoji: '🤔', name: 'pensativo' },
    { emoji: '😴', name: 'dormindo' },
    { emoji: '🤯', name: 'cabeça explodindo' },
    { emoji: '😜', name: 'piscando' },
    { emoji: '🤩', name: 'deslumbrado' },
    { emoji: '😇', name: 'anjo' },
    { emoji: '🥳', name: 'comemorando' },
    { emoji: '😷', name: 'doente' },
    { emoji: '🤒', name: 'enfermo' },
    { emoji: '🤕', name: 'machucado' },
    { emoji: '🤑', name: 'dinheiro' },
    { emoji: '🤠', name: 'caubói' },
    { emoji: '😈', name: 'diabinho sorridente' },
    { emoji: '👿', name: 'diabinho bravo' },
    { emoji: '👻', name: 'fantasma' },
    { emoji: '💀', name: 'caveira' },
    { emoji: '☠️', name: 'caveira e ossos cruzados' },
    { emoji: '👽', name: 'alienígena' },
    { emoji: '👾', name: 'monstro alienígena' },
    { emoji: '🤖', name: 'robô' },
    { emoji: '🎃', name: 'abóbora' },
    { emoji: '😺', name: 'gato sorridente' },
    { emoji: '😸', name: 'gato sorridente com olhos sorridentes' },
    { emoji: '😹', name: 'gato chorando de rir' },
    { emoji: '😻', name: 'gato apaixonado' },
    { emoji: '😼', name: 'gato com sorriso irônico' },
    { emoji: '😽', name: 'gato beijando' },
    { emoji: '🙀', name: 'gato cansado' },
    { emoji: '😿', name: 'gato chorando' },
    { emoji: '😾', name: 'gato emburrado' },
    { emoji: '👤', name: 'silhueta' }
];
//função que vai ser usad para pesquisar o emoji que a pessoa quer
function pesquisaEmojis() {
    return __awaiter(this, void 0, void 0, function* () {
        let emojis = exports.emojiList;
        while (true) {
            const resposta = yield inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "pesquisa",
                    message: "Digite o nome do emoji (digite 'sair' para encerrar):",
                },
            ]);
            const pesquisa = resposta.pesquisa.toLowerCase();
            if (pesquisa === 'sair') {
                console.log("Encerrando a busca.");
                break;
            }
            // Filtra os emojis com base na pesquisa
            const resultados = emojis.filter(emoji => emoji.name.toLowerCase().includes(pesquisa.toLowerCase()));
            if (resultados.length === 0) {
                console.log("Nenhum emoji encontrado.");
                continue;
            }
            // Cria uma lista de nomes para selecionar
            const escolhas = resultados.map(emoji => emoji.name);
            escolhas.push('Sair');
            const { escolha } = yield inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "escolha",
                    message: "Selecione um emoji ou escolha 'Sair' para encerrar:",
                    choices: escolhas
                }
            ]);
            if (escolha === 'Sair') {
                console.log("Encerrando a busca.");
                break;
            }
            console.log(`Você selecionou o emoji: ${escolha}`);
        }
    });
}
