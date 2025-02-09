"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiList = void 0;
exports.pesquisaEmojis = pesquisaEmojis;
const inquirer_1 = __importDefault(require("inquirer"));
const utilsAuxiliaresMenu_1 = require("./utilsAuxiliaresMenu");
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
//função que vai ser usad para pesquisar o emoji que a pessoa quer
async function pesquisaEmojis() {
    try {
        let emojis = exports.emojiList;
        while (true) {
            // Solicita ao usuário o nome do emoji
            const resposta = await inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "pesquisa",
                    message: (0, utilsAuxiliaresMenu_1.centerText)("Digite o nome do emoji (digite 'sair' para encerrar):"),
                },
            ]);
            const pesquisa = resposta.pesquisa.toLowerCase();
            // Se digitar 'sair', encerra
            if (pesquisa === 'sair') {
                console.log((0, utilsAuxiliaresMenu_1.centerText)("Encerrando a busca."));
                return null;
            }
            // Filtra os emojis pelo nome
            const resultados = emojis.filter(emoji => emoji.name.toLowerCase().includes(pesquisa.toLowerCase()));
            if (resultados.length === 0) {
                console.log((0, utilsAuxiliaresMenu_1.centerText)("Nenhum emoji encontrado."));
                continue;
            }
            // Cria a lista de emojis para seleção
            const escolhas = resultados.map(emoji => emoji.emoji);
            escolhas.push('Sair');
            // Exibe o prompt para selecionar o emoji
            const { escolha } = await inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "escolha",
                    message: (0, utilsAuxiliaresMenu_1.centerText)("Selecione um emoji ou escolha 'Sair' para encerrar:"),
                    choices: escolhas,
                    pageSize: 20
                }
            ]);
            // Se a escolha for 'Sair', encerra
            if (escolha === 'Sair') {
                console.log((0, utilsAuxiliaresMenu_1.centerText)("Encerrando a busca."));
                return null;
            }
            // Retorna o emoji escolhido
            return escolha;
        }
    }
    catch (error) {
        console.error("Erro ao pesquisar emojis:", error);
        return null;
    }
}
