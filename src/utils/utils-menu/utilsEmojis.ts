import inquirer from "inquirer";
import { centerText } from "./utilsAuxiliaresMenu";

export interface EmojiDictionary { // Interface para o dicionário de emojis , foi o que deu pra fazer
    emoji: string;
    name: string;
}

//tem os emojis e seus respectivos nomes para serem usados
export const emojiList: EmojiDictionary[] = [
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
export async function pesquisaEmojis() {
    try {
        let emojis = emojiList;

        while (true) {
            // Solicita ao usuário o nome do emoji
            const resposta = await inquirer.prompt([
                {
                    type: "input",
                    name: "pesquisa",
                    message: centerText("Digite o nome do emoji (digite 'sair' para encerrar):"),
                },
            ]);
            const pesquisa = resposta.pesquisa.toLowerCase();

            // Se digitar 'sair', encerra
            if (pesquisa === 'sair') {
                console.log(centerText("Encerrando a busca."));
                return null;
            }

            // Filtra os emojis pelo nome
            const resultados = emojis.filter(emoji =>
                emoji.name.toLowerCase().includes(pesquisa.toLowerCase())
            );

            if (resultados.length === 0) {
                console.log(centerText("Nenhum emoji encontrado."));
                continue;
            }

            // Cria a lista de emojis para seleção
            const escolhas = resultados.map(emoji => emoji.emoji);
            escolhas.push('Sair');

            // Exibe o prompt para selecionar o emoji
            const { escolha } = await inquirer.prompt([
                {
                    type: "list",
                    name: "escolha",
                    message: centerText("Selecione um emoji ou escolha 'Sair' para encerrar:"),
                    choices: escolhas,
                    pageSize: 20
                }
            ]);

            // Se a escolha for 'Sair', encerra
            if (escolha === 'Sair') {
                console.log(centerText("Encerrando a busca."));
                return null;
            }

            // Retorna o emoji escolhido
            return escolha;
        }
    } catch (error) {
        console.error("Erro ao pesquisar emojis:", error);
        return null;
    }
}