"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
async function selecionarInteresses() {
    // Lista de interesses
    const interesses = [
        'Tecnologia',
        'Esportes',
        'Música',
        'Artes',
        'Viagens',
        'Livros',
        'Fotografia',
        'Culinária'
    ];
    // Pergunta com tipo checkbox
    const resposta = await inquirer_1.default.prompt([
        {
            type: 'checkbox',
            name: 'interessesSelecionados',
            message: 'Selecione seus interesses:',
            choices: interesses,
        },
    ]);
    // Exibe os interesses selecionados
    console.log('Você selecionou os seguintes interesses:');
    resposta.interessesSelecionados.forEach((interesse) => {
        console.log(interesse);
    });
}
selecionarInteresses();
